const express = require("express");
const router = express.Router();
const {
  getAllPlaylists,
  getPlaylistDetails,
  deletePlaylist,
} = require("../controllers/playlistController");
const { verifyToken, verifyIsAdmin } = require("../middleware/authMiddleware");

router.get("/", verifyToken, verifyIsAdmin, getAllPlaylists);
router.get("/:playlistId", verifyToken, verifyIsAdmin, getPlaylistDetails);
router.delete("/:id", verifyToken, verifyIsAdmin, deletePlaylist);

module.exports = router;
