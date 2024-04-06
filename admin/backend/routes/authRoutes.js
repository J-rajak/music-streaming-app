const express = require("express");
const router = express.Router();
const app = express();
const {
  registerUser,
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
router.post("/register", schemaValidator("authRegister"), registerUser);
router.post("/login", schemaValidator("authLogin"), loginUser);

router.post("/logout", logOutUser);

module.exports = router;
