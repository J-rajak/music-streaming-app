const express = require("express");
const router = express.Router();
const {
  getAllAlbums,
  getAlbumDetails,
  postAlbum,
} = require("../controllers/albumController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumDetails);
router.post("/", verifyToken, postAlbum);

module.exports = router;
