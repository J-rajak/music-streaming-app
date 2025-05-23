const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  registerUser,
  verifyEmail,
  verification,
  loginUser,
  logOutUser,
  refresh,
  loginSuccess,
  googleLogin,
  facebookLogin,
  twitterLogin,
  passwordResetRequest,
  resetPassword,
} = require("../controllers/authController");
const { loginLimiter } = require("../middleware/loginLimiter");
const { verifyToken } = require("../middleware/authMiddleware");
const schemaValidator = require("../middleware/schemaValidator");

router.get("/refresh", refresh);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "",
    failureRedirect: "",
    session: false,
  }),
  googleLogin
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "",
    session: false,
  }),
  facebookLogin
);

router.get(
  "/twitter",
  passport.authenticate("twitter", {
    scope: ["profile", "email"],
    session: false,
    failureRedirect: "",
  })
);
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "",
    session: false,
  }),
  twitterLogin
);

router.post("/register", schemaValidator("authRegister"), registerUser);
router.post("/requestPasswordReset", passwordResetRequest);
router.post("/resetPassword", resetPassword);
// router.get("/verify/:userId/:uniqueString", verifyEmail);
// router.get("/verified", verification);
router.post("/login", schemaValidator("authLogin"), loginUser);
router.get("/loginSuccess", verifyToken, loginSuccess);

router.post("/logout", logOutUser);

module.exports = router;
