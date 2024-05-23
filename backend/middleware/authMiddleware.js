const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const verifyToken = asyncHandler((req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).send("Not Authorized, no token");
  }
  jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decodedUser) => {
    if (err) {
      return res.status(401).send("Not Authorized, invalid token");
    }
    const foundUser = await User.findOne({ _id: decodedUser.id });
    if (!foundUser) {
      return res.status(401).send("Unauthorized! User not found");
    }
    req.user = foundUser;
    next();
  });
});

const generateAccessToken = ({ id, username, email, isPremium }) => {
  const accessToken = jwt.sign(
    { id, username, email, isPremium },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
  return {
    accessToken,
  };
};

const generateRefreshToken = ({ id, username, email, isPremium }) => {
  const refreshToken = jwt.sign(
    { id, username, email, isPremium },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return {
    refreshToken,
  };
};

const checkSubscriptionStatus = asyncHandler(async (req, res, next) => {
  const userId = req.user.id; 

  const user = await User.findById(userId);

  if (user) {
    const currentDate = new Date();

    if (user.membershipEndDate && currentDate > user.membershipEndDate) {
      user.isPremium = false;
      await user.save();
    }
  }

  next();
});

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  checkSubscriptionStatus,
};
