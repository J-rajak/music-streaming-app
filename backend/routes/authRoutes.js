const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  refresh,
  loginSuccess,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const schemaValidator = require("../middleware/schemaValidator");

router.get("/refresh", refresh);
router.post("/register", schemaValidator("authRegister"), registerUser);
router.post("/login", schemaValidator("authLogin"), loginUser);
router.get("/loginSuccess", verifyToken, loginSuccess);

router.post("/logout", logOutUser);

module.exports = router;
