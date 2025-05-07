require("dotenv").config();
const User = require("../models/User");
const UserVerification = require("../models/UserVerification");
const PasswordReset = require("../models/PasswordReset");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

// const transporter = nodemailer.createTransport({
//   // host: "smtp.ethereal.email",
//   // port: 587,
//   // secure: false,
//   service: "gmail",
//   auth: {
//     user: process.env.AUTH_EMAIL,
//     pass: process.env.AUTH_PASS,
//   },
// });

// testing nodemailer success
// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready for message");
//     console.log(success);
//   }
// });

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
      _id: newUser._id,
      username: newUser.username,
      isPremium: newUser.isPremium,
    });
  }
});

// const sendVerificationEmail = ({ _id, email }, res) => {
//   const currentUrl = "http://localhost:5173";

//   const uniqueString = uuidv4() + _id;

//   // mail options
//   const mailOptions = {
//     from: process.env.AUTH_EMAIL,
//     to: email,
//     subject: "Verify your email",
//     html: `<p>Verify your email address to complete the signup and login into your account.</p><p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${
//       currentUrl + "/auth/verify/" + _id + "/" + uniqueString
//     }>here</a> to proceed</p>`,
//   };

//   //hash the unique string
//   const saltRounds = 10;
//   bcrypt
//     .hash(uniqueString, saltRounds)
//     .then((hashedUniqueString) => {
//       // set values in user collection
//       const newUserVerification = new UserVerification({
//         userId: _id,
//         uniqueString: hashedUniqueString,
//         createdAt: Date.now(),
//         expiresAt: Date.now() + 21600000,
//       });

//       newUserVerification
//         .save()
//         .then(() => {
//           transporter
//             .sendMail(mailOptions)
//             .then(() => {
//               // email sent and verification record saved
//               res.json({
//                 status: "PENDING",
//                 message: "Verification email sent!!",
//               });
//             })
//             .catch((err) => {
//               console.log(err);
//               res.json({
//                 status: "FAILED",
//                 message: "verification with email failed",
//               });
//             });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.json({
//             status: "FAILED",
//             message: "An error occurred during verification",
//           });
//         });
//     })
//     .catch((err) => {
//       res.json({
//         status: "FAILED",
//         message: "An error occurred while hashing the email data!!!",
//       });
//     });
// };

// get
// admin/users/verify/:userId/:uniqueString
// const verifyEmail = async (req, res) => {
//   let { userId, uniqueString } = req.params;

//   UserVerification.find({ userId })
//     .then((result) => {
//       if (result.length > 0) {
//         //user verification record exists so we proceed
//         const { expiresAt } = result[0];
//         const hashedUniqueString = result[0].uniqueString;

//         //checking for expired unique string
//         if (expiresAt < Date.now()) {
//           // record has expired
//           UserVerification.deleteOne({ userId })
//             .then((result) => {
//               User.deleteOne({ _id: userId })
//                 .then(() => {
//                   let message = "Link has expired. Please sign up again";
//                   res.redirect(`/auth/verified/error=true&message=${message}`);
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                   let message =
//                     "Clearing user with expired unique string failed";
//                   res.redirect(`/auth/verified/error=true&message=${message}`);
//                 });
//             })
//             .catch((err) => {
//               console.log(err);
//               let message =
//                 "An error occurred while clearing for expired user verification record";
//               res.redirect(`/auth/verified/error=true&message=${message}`);
//             });
//         } else {
//           // user verification record exists
//           //compare the hashed unique string
//           bcrypt
//             .compare(uniqueString, hashedUniqueString)
//             .then((result) => {
//               if (result) {
//                 // string matches
//                 User.updateOne({ _id: userId }, { isVerified: true })
//                   .then(() => {
//                     UserVerification.deleteOne({ userId })
//                       .then(() => {
//                         res.sendFile(
//                           path.join(__dirname, "./../views/verified.html")
//                         );
//                       })
//                       .catch((err) => {
//                         let message =
//                           "An error occurred while finalizing successful verification";
//                         res.redirect(
//                           `/auth/verified/error=true&message=${message}`
//                         );
//                       });
//                   })
//                   .catch((err) => {
//                     console.log(err);
//                     let message =
//                       "An error occurred while updating user record";
//                     res.redirect(
//                       `/auth/verified/error=true&message=${message}`
//                     );
//                   });
//               } else {
//                 // existing record but incorrect verification details passed
//                 let message =
//                   "Invalid verification details passed. Please check you inbox";
//                 res.redirect(`/auth/verified/error=true&message=${message}`);
//               }
//             })
//             .catch((err) => {
//               let message =
//                 "An error occurred while comparing the unique strings";
//               res.redirect(`/auth/verified/error=true&message=${message}`);
//             });
//         }
//       } else {
//         // user verification record does'nt exist
//         let message =
//           "Account record doesn't exist or has been verified already. Please login or signup";
//         res.redirect(`/auth/verified/error=true&message=${message}`);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       let message =
//         "An error occurred while checking for existing user verification record";
//       res.redirect(`/auth/verified/error=true&message=${message}`);
//     });
// };

// verified
//get req /verified
// const verification = (req, res) => {
//   res.sendFile(path.join(__dirname, "./../views/verified.html"));
// };

//login user
//POST auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // console.log(recaptchaToken);
  //verify all fields were filled
  if (!username || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // check that user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User does not exists" });
  }

  // if (!user.isVerified) {
  //   return res.status(400).json({
  //     status: "FAILED",
  //     message: "User is not verified!!",
  //   });
  // }

  // Verify Recaptcha token
  // const response = await fetch(
  //   `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
  //   {
  //     method: "POST",
  //   }
  // );
  // const data = await response.json();

  // console.log(data);
  if (user) {
    // compare password
    const comparePassword = await user.comparePassword(password);
    if (!comparePassword) {
      return res
        .status(400)
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
  } else {
    res
      .status(400)
      .json({ message: "ReCAPTCHA verification failed. Please try again" });
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

  res.status(200).redirect("http://localhost:5173/");
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

// request password reset
const passwordResetRequest = async (req, res) => {
  const { email, redirectURL } = req.body;

  User.find({ email })
    .then((data) => {
      if (data.length) {
        //user exists

        //check if the user is verified

        if (!data[0].isVerified) {
          res.json({
            status: "Failed",
            message: "Email hasn't been verified.. Check you email",
          });
        } else {
          //proceed with the email to reset password
          sendResetEmail(data[0], redirectURL, res);
        }
      } else {
        res.json({
          status: "FAILED",
          message: "No account with the supplied email exists",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "FAILED",
        message: "An error ocurred while checking for existing user",
      });
    });
};

// send password reset email

const sendResetEmail = ({ _id, email }, redirectURL, res) => {
  const resetString = uuidv4() + _id;

  //First clear all existing reset records
  PasswordReset.deleteMany({ userId: _id })
    .then((result) => {
      // send the mail

      // mail options
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Password Reset",
        html: `<p>Password Reset</p><p>Don't worry click the link below to reset it.</b>.</p><p>This link expires in 60 minutes</p><p>Press <a href=${
          redirectURL + "/" + _id + "/" + resetString
        }>here</a> to proceed</p>`,
      };

      // hash the rest string
      const saltRounds = 10;
      bcrypt
        .hash(resetString, saltRounds)
        .then((hashedResetString) => {
          // create a new password reset record
          const newPasswordReset = new PasswordReset({
            userId: _id,
            resetString: hashedResetString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
          });

          newPasswordReset
            .save()
            .then(() => {
              transporter
                .sendMail(mailOptions)
                .then(() => {
                  //reset email sent and password record saved
                  res.json({
                    status: "PENDING",
                    message: "Password reset email sent",
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.json({
                    status: "FAILED",
                    message: "Failed to send mail",
                  });
                });
            })
            .catch((error) => {
              console.log(error);
              res.json({
                status: "FAILED",
                message:
                  "An error ocurred while saving the reset details to the db",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          res.json({
            status: "FAILED",
            message: "An error ocurred while hashing the password reset",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "FAILED",
        message: "Clearing existing password reset match failed",
      });
    });
};

// reset the pass
const resetPassword = async (req, res) => {
  const { userId, resetString, newPassword } = req.body;

  PasswordReset.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        // password reset record exists so we proceed
        const { expiresAt } = result[0];
        const hashedResetString = result[0].resetString;
        // checking for expired reset string
        if (expiresAt < Date.now()) {
          PasswordReset.deleteOne({ userId })
            .then(
              // reset record deleted successfully
              res.json({
                status: "FAILED",
                message: "Password reset link has expired",
              })
            )
            .catch((error) => {
              console.log(error);
              res.json({
                status: "FAILED",
                message: "Password reset not cleared",
              });
            });
        } else {
          // valid reset exists so we reset the pass
          bcrypt
            .compare(resetString, hashedResetString)
            .then((result) => {
              if (result) {
                // strings matched
                // hashed password again

                const saltRounds = 10;
                bcrypt
                  .hash(newPassword, saltRounds)
                  .then((hashedNewPassword) => {
                    // update user password

                    User.updateOne(
                      { _id: userId },
                      { password: hashedNewPassword }
                    )
                      .then(() => {
                        // update completed now remove reset pass record
                        PasswordReset.deleteOne({ userId })
                          .then(() => {
                            // success
                            res.json({
                              status: "SUCCESS",
                              message: "Password has been reset successfully",
                            });
                          })
                          .catch((error) => {
                            console.log(error);
                            res.json({
                              status: "FAILED",
                              message:
                                "An error ocurred while finalizing password reset",
                            });
                          });
                      })
                      .catch((error) => {
                        console.log(error);
                        res.json({
                          status: "FAILED",
                          message: "Updating user password failed",
                        });
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    res.json({
                      status: "FAILED",
                      message: "An error ocurred while hashing new password",
                    });
                  });
              } else {
                // existing record but incorrect reset string passed
                res.json({
                  status: "FAILED",
                  message: "Invalid password reset passed",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              res.json({
                status: "FAILED",
                message: "Comparing password reset string failed",
              });
            });
        }
      } else {
        //pass reset record does'nt exist
        res.json({
          status: "FAILED",
          message: "Password reset record does'nt exist",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "FAILED",
        message: "Checking for existing password reset failed ",
      });
    });
};

module.exports = {
  registerUser,
  // verifyEmail,
  // verification,
  loginUser,
  googleLogin,
  facebookLogin,
  twitterLogin,
  loginSuccess,
  logOutUser,
  refresh,
  passwordResetRequest,
  resetPassword,
};
