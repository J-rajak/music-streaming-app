const express = require("express");
const router = express.Router();

const {
  getUserDetails,
  editUserDetails,
  uploadImage,
  getCurrentUser,
  uploadSong,
  uploadAlbum,
  viewPlans,
  onSubscribePlan,
  onUnsubscribePlan,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

//user routes
router.patch("/edit", verifyToken, editUserDetails);
router.get("/currentUser", verifyToken, getCurrentUser);
router.post("/upload", verifyToken, upload.single("image"), uploadImage);
router.post("/upload/song", verifyToken, uploadSong);
router.post("/upload/album", verifyToken, uploadAlbum);
router.get("/:userId", getUserDetails);
router.get("/plans", viewPlans);
router.put("/subscribe", onSubscribePlan);
router.put("/unSubscribe", onUnsubscribePlan);

module.exports = router;
