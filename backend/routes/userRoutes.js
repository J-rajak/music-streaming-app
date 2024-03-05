const express = require("express");
const router = express.Router();

const {
  getUserDetails,
  editUserDetails,
  uploadImage,
  getCurrentUser,
  getUsers,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken, verifyIsAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

//user routes
router.patch("/edit", verifyToken, editUserDetails);
router.get("/currentUser", verifyToken, getCurrentUser);
router.post("/upload", verifyToken, upload.single("image"), uploadImage);
router.get("/:userId", getUserDetails);

//admin routes
router.use(verifyToken);
router.get("/admin/getUsers", verifyIsAdmin, getUsers);
router.delete("/admin/:id", verifyIsAdmin, deleteUser);
module.exports = router;
