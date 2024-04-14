const express = require("express");
const router = express.Router();
const app = express();
const {
  registerUser,
  verifyEmail,
  verification,
  loginUser,
  logOutUser,
  refresh,
} = require("../../backend/controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const schemaValidator = require("../middleware/schemaValidator");

// app.use("/get-token", (req, res) => {
//   try {
//     const accessToken = req.cookies["access_token"];
//     console.log(accessToken);
//     const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
//     return res.json({
//       token: decoded.name,
//       isAdmin: decoded.isAdmin,
//       isPremium: decoded.isPremium,
//     });
//   } catch (err) {
//     return res.status(401).send("Unauthorized. Invalid Token");
//   }
// });

router.get("/refresh", refresh);
router.get("/verify/:userId/:uniqueString", verifyEmail);
router.get("/verified", verification);
router.post("/register", schemaValidator("authRegister"), registerUser);
router.post("/login", schemaValidator("authLogin"), loginUser);

router.post("/logout", logOutUser);

// verify email get req
// admin/users/verify/:userId/:uniqueString
// router.get("/verify/:userId/:uniqueString", (req, res) => {
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
//                   res.redirect(`/user/verified/error=true&message=${message}`);
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                   let message =
//                     "Clearing user with expired unique string failed";
//                   res.redirect(`/user/verified/error=true&message=${message}`);
//                 });
//             })
//             .catch((err) => {
//               console.log(err);
//               let message =
//                 "An error occurred while clearing for expired user verification record";
//               res.redirect(`/user/verified/error=true&message=${message}`);
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
//                           `/user/verified/error=true&message=${message}`
//                         );
//                       });
//                   })
//                   .catch((err) => {
//                     console.log(err);
//                     let message =
//                       "An error occurred while updating user record";
//                     res.redirect(
//                       `/user/verified/error=true&message=${message}`
//                     );
//                   });
//               } else {
//                 // existing record but incorrect verification details passed
//                 let message =
//                   "Invalid verification details passed. Please check you inbox";
//                 res.redirect(`/user/verified/error=true&message=${message}`);
//               }
//             })
//             .catch((err) => {
//               let message =
//                 "An error occurred while comparing the unique strings";
//               res.redirect(`/user/verified/error=true&message=${message}`);
//             });
//         }
//       } else {
//         // user verification record does'nt exist
//         let message =
//           "Account record doesn't exist or has been verified already. Please login or signup";
//         res.redirect(`/user/verified/error=true&message=${message}`);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       let message =
//         "An error occurred while checking for existing user verification record";
//       res.redirect(`/user/verified/error=true&message=${message}`);
//     });
// });

// // verified
// //get req /verified

// router.get("/verified", (req, res) => {
//   res.sendFile(path.join(__dirname, "./../views/verified.html"));
// });

module.exports = router;
