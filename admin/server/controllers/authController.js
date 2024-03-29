const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/authMiddleware");
const fetch = require("node-fetch");

// register new user
// POST auth/register

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //verify all fields were filled
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // check for existing user
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    if (existingUser.email === email) {
      return res
        .status(400)
        .json({ message: "A user with that email already exists" });
    } else {
      return res
        .status(400)
        .json({ message: "Username taken. Please choose another username" });
    }
  }

  const newUser = await User.create({ username, email, password });

  if (newUser) {
    const { accessToken } = generateAccessToken({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isPremium: newUser.isPremium,
    });
    const { refreshToken } = generateRefreshToken({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isPremium: newUser.isPremium,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000, // expires in 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      username: newUser.username,
      isPremium: newUser.isPremium,
    });
  }
});

//login user
//POST auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  //verify all fields were filled
  if (!username || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // check that user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User does not exists" });
  }

  if (user) {
    //compare password
    const comparePassword = await user.comparePassword(password);
    if (!comparePassword) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    const { accessToken } = generateAccessToken({
      id: user._id,
      username: user.username,
      email: user.email,
      isPremium: user.isPremium,
    });
    const { refreshToken } = generateRefreshToken({
      id: user._id,
      username: user.username,
      email: user.email,
      isPremium: user.isPremium,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days (match refreshToken expiration)
    });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      isPremium: user.isPremium,
    });
  }
});

// @desc  Google login
// @route GET /auth/google/callback
// @access Public
const googleLogin = asyncHandler(async (req, res) => {
  const { accessToken } = generateAccessToken({
    id: req.user._id,
    username: req.user.username,
  });
  const { refreshToken } = generateRefreshToken({
    id: req.user._id,
    username: req.user.username,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 minutes (match accessToken expiration)
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days (match refreshToken expiration)
  });

  res.status(200).redirect();
});

// @desc  Facebook login
// @route GET /auth/facebook/callback
// @access Public
const facebookLogin = asyncHandler(async (req, res) => {
  const { accessToken } = generateAccessToken({
    id: req.user._id,
    username: req.user.username,
  });
  const { refreshToken } = generateRefreshToken({
    id: req.user._id,
    username: req.user.username,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 minutes (match accessToken expiration)
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days (match refreshToken expiration)
  });

  res.status(200).redirect();
});

// @desc  Twitter login
// @route GET /auth/twitter/callback
// @access Public
const twitterLogin = asyncHandler(async (req, res) => {
  const { accessToken } = generateAccessToken({
    id: req.user._id,
    username: req.user.username,
  });
  const { refreshToken } = generateRefreshToken({
    id: req.user._id,
    username: req.user.username,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 minutes (match accessToken expiration)
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days (match refreshToken expiration)
  });

  res.status(200).redirect();
});

// @desc Get Login state for third party OAuth
// @route GET /auth/loginSuccess
// @access Private
const loginSuccess = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      username: req.user.username,
      isPremium: req.user.isPremium,
    });
  }
});

// @desc  Refresh token
// @route GET /auth/refresh
// @access Public
const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized! Invalid or expired refresh token" });
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  if (!decoded) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
  // generate new access token
  const { accessToken } = generateAccessToken({
    id: decoded.id,
    username: decoded.username,
    email: decoded.email,
    isPremium: decoded.isPremium,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 minutes (match accessToken expiration)
  });

  res.status(200).json({ message: "Token refreshed" });
});

// @desc  Log out user
// @route POST /auth/logout
// @access Public
const logOutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Log out successful" });
});

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  facebookLogin,
  twitterLogin,
  loginSuccess,
  logOutUser,
  refresh,
};
