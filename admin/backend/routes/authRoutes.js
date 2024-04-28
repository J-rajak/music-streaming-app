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

router.get("/refresh", refresh);
router.get("/verify/:userId/:uniqueString", verifyEmail);
router.get("/verified", verification);
router.post("/register", schemaValidator("authRegister"), registerUser);
router.post("/login", schemaValidator("authLogin"), loginUser);

router.post("/logout", logOutUser);

module.exports = router;
