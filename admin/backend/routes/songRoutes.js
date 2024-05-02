const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSongDetails,
  deleteSong,
} = require("../controllers/songController");
const { verifyToken, verifyIsAdmin } = require("../middleware/authMiddleware");

router.get("/", verifyToken, verifyIsAdmin, getAllSongs);
router.get("/:songId", verifyToken, verifyIsAdmin, getSongDetails);
router.delete("/:id", verifyToken, verifyIsAdmin, deleteSong);


module.exports = router;
