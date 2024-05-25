require("dotenv").config({ path: "./config/.env" });
const User = require("../models/User");
const UserVerification = require("../models/UserVerification");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/authMiddleware");
const fetch = require("node-fetch");

// register new user
// POST auth/register

const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  // port: 587,
  // secure: false,
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

// testing nodemailer success
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for message");
    console.log(success);
  }
});

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

  const newUser = await User.create({ username, email, password }).then(
    (result) => {
      // handle account verification
      sendVerificationEmail(result, res);
    }
  );

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

const sendVerificationEmail = ({ _id, email }, res) => {
  const currentUrl = "http://localhost:3000";

  const uniqueString = uuidv4() + _id;

  // mail options
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify your email",
    html: `<p>Verify your email address to complete the signup and login into your account.</p><p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${
      currentUrl + "/admin/auth/verify/" + _id + "/" + uniqueString
    }>here</a> to proceed</p>`,
  };

  //hash the unique string
  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
      // set values in user collection
      const newUserVerification = new UserVerification({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000,
      });

      newUserVerification
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              // email sent and verification record saved
              res.json({
                status: "PENDING",
                message: "Verification email sent!!",
              });
            })
            .catch((err) => {
              console.log(err);
              res.json({
                status: "FAILED",
                message: "verification with email failed",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          res.json({
            status: "FAILED",
            message: "An error occurred during verification",
          });
        });
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "An error occurred while hashing the email data!!!",
      });
    });
};

// get
// admin/users/verify/:userId/:uniqueString
const verifyEmail = async (req, res) => {
  let { userId, uniqueString } = req.params;

  UserVerification.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        //user verification record exists so we proceed
        const { expiresAt } = result[0];
        const hashedUniqueString = result[0].uniqueString;

        //checking for expired unique string
        if (expiresAt < Date.now()) {
          // record has expired
          UserVerification.deleteOne({ userId })
            .then((result) => {
              User.deleteOne({ _id: userId })
                .then(() => {
                  let message = "Link has expired. Please sign up again";
                  res.redirect(`/admin/auth/verified/error=true&message=${message}`);
                })
                .catch((err) => {
                  console.log(err);
                  let message =
                    "Clearing user with expired unique string failed";
                  res.redirect(`/admin/auth/verified/error=true&message=${message}`);
                });
            })
            .catch((err) => {
              console.log(err);
              let message =
                "An error occurred while clearing for expired user verification record";
              res.redirect(`/admin/auth/verified/error=true&message=${message}`);
            });
        } else {
          // user verification record exists
          //compare the hashed unique string
          bcrypt
            .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              if (result) {
                // string matches
                User.updateOne({ _id: userId }, { isVerified: true })
                  .then(() => {
                    UserVerification.deleteOne({ userId })
                      .then(() => {
                        res.sendFile(
                          path.join(__dirname, "./../views/verified.html")
                        );
                      })
                      .catch((err) => {
                        let message =
                          "An error occurred while finalizing successful verification";
                        res.redirect(
                          `/admin/auth/verified/error=true&message=${message}`
                        );
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    let message =
                      "An error occurred while updating user record";
                    res.redirect(
                      `/admin/auth/verified/error=true&message=${message}`
                    );
                  });
              } else {
                // existing record but incorrect verification details passed
                let message =
                  "Invalid verification details passed. Please check you inbox";
                res.redirect(`/admin/auth/verified/error=true&message=${message}`);
              }
            })
            .catch((err) => {
              let message =
                "An error occurred while comparing the unique strings";
              res.redirect(`/admin/auth/verified/error=true&message=${message}`);
            });
        }
      } else {
        // user verification record does'nt exist
        let message =
          "Account record doesn't exist or has been verified already. Please login or signup";
        res.redirect(`/admin/auth/verified/error=true&message=${message}`);
      }
    })
    .catch((err) => {
      console.log(err);
      let message =
        "An error occurred while checking for existing user verification record";
      res.redirect(`/admin/auth/verified/error=true&message=${message}`);
    });
};

// verified
//get req /verified
const verification = (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/verified.html"));
};

// const sendOTPVerification = async ({ _id, email }, res) => {
//   try {
//     const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
//     const mailOptions = {
//       from: "",
//       to: email,
//       subject: "Verify your email",
//       html: "",
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
//POST admin/auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //verify all fields were filled
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // check that user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User does not exists" });
  }

  if (!user.isAdmin || !user.isVerified) {
    return res.status(400).json({
      status: "FAILED",
      message: "User is not verified or is not an admin",
    });
  }

  //compare password
  const comparePassword = await user.comparePassword(password);
  if (!comparePassword) {
    return res.status(401).json({ message: "Incorrect username or password" });
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
  verifyEmail,
  verification,
  loginUser,
  logOutUser,
  refresh,
};
