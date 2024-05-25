require("dotenv").config();
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

const generateAccessToken = ({ id, username, email, isAdmin}) => {
  const accessToken = jwt.sign(
    { id, username, email, isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
  return {
    accessToken,
  };
};

const generateRefreshToken = ({ id, username, email, isAdmin  }) => {
  const refreshToken = jwt.sign(
    { id, username, email, isAdmin},
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return {
    refreshToken,
  };
};

const verifyIsAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  verifyIsAdmin,
};
