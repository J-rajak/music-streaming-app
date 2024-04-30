const express = require("express");
const router = express.Router();
const {
  newPlan,
  uploadImage,
  getUsers,
  getUserProfile,
  updateUserProfile,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/userController");
const { verifyToken, verifyIsAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.post("/create/plan", verifyToken, newPlan);
router.post("/upload", verifyToken, upload.single("image"), uploadImage);
router.route("/").get(verifyToken, verifyIsAdmin, getUsers);
router
  .route("/profile")
  .get(verifyToken, getUserProfile)
  .put(verifyToken, updateUserProfile);

router
  .route("/:id")
  .delete(verifyToken, verifyIsAdmin, deleteUser)
  .get(verifyToken, verifyIsAdmin, getUserById)
  .put(verifyToken, verifyIsAdmin, updateUser);

module.exports = router;
