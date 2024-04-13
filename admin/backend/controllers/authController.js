const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
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
      isAdmin: newUser.isAdmin,
    });
    const { refreshToken } = generateRefreshToken({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
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
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  }
});

// const sendOTPVerification = async ({ _id, email }, res) => {
//   try {
//     const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
//     const mailOptions = {
//       from: "",
//       to: email,
//       subject: "Verify your email",
//       html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete verification</p>`,
//     };

//     //hash the otp
//     const saltRounds = 10;
//     const hashedOTP = await bcrypt.hash(otp, saltRounds);
//     new UserOTPVerification = await new UserOTPVerification({
//       userId: _id,
//       otp: hashedOTP,
//       createdAt: Date.now(),
//       expiresAt: Date.now() + 3600000,
//     })
//   } catch (err) {}
// };

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
      isAdmin: user.isAdmin,
    });
    const { refreshToken } = generateRefreshToken({
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
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
      email: user.email,
      isAdmin: user.isAdmin,
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
    isAdmin: decoded.isAdmin,
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
  logOutUser,
  refresh,
};
