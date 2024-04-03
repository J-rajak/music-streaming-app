const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSongDetails,
} = require("../controllers/songController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllSongs);
router.get("/:songId", getSongDetails);

module.exports = router;
