const express = require("express");
const router = express.Router();

const {
  getUserDetails,
  editUserDetails,
  uploadImage,
  getCurrentUser,
  uploadSong,
  uploadAlbum,
  onSubscribePlan,
  onUnsubscribePlan,
  getPlans,
  khaltiPayment,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

//user routes
router.get("/plans", verifyToken, getPlans);
router.get("/:userId", getUserDetails);
router.patch("/edit", verifyToken, editUserDetails);
router.get("/currentUser", verifyToken, getCurrentUser);
router.post("/upload", verifyToken, upload.single("image"), uploadImage);
router.post("/khaltiCheckout", khaltiPayment);
router.post("/upload/song", verifyToken, uploadSong);
router.post("/upload/album", verifyToken, uploadAlbum);
router.put("/subscribe", onSubscribePlan);
router.put("/unSubscribe", onUnsubscribePlan);


module.exports = router;
