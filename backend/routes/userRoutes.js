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
  onFreeSubscription,
} = require("../controllers/userController");
const {
  verifyToken,
  checkSubscriptionStatus,
} = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

//user routes
router.get("/currentUser", verifyToken, getCurrentUser);
router.get("/plans", verifyToken, getPlans);
router.get("/:userId", getUserDetails);
router.patch("/edit", verifyToken, editUserDetails);
router.post("/upload", verifyToken, upload.single("image"), uploadImage);
router.post("/khaltiCheckout", khaltiPayment);
router.post("/upload/song", verifyToken, uploadSong);
router.post("/upload/album", verifyToken, uploadAlbum);
router.put("/subscribe", verifyToken, onSubscribePlan);
router.put(
  "/subscribe/:freePlanId",
  verifyToken,
  checkSubscriptionStatus,
  onFreeSubscription
);
router.put("/unSubscribe", verifyToken, onUnsubscribePlan);

module.exports = router;
