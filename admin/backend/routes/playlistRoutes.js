const express = require("express");
const router = express.Router();
const {
  getAllPlaylists,
  getPlaylistDetails,
} = require("../controllers/playlistController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllPlaylists);
router.get("/:playlistId", getPlaylistDetails);

module.exports = router;
