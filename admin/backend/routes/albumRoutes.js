const express = require("express");
const router = express.Router();
const {
  getAllAlbums,
  getAlbumDetails,
  postAlbum,
  deleteAlbum,
} = require("../controllers/albumController");
const { verifyToken, verifyIsAdmin } = require("../middleware/authMiddleware");

router.get("/",verifyToken, verifyIsAdmin, getAllAlbums);
router.get("/:albumId",verifyToken, verifyIsAdmin, getAlbumDetails);
router.post("/", verifyToken,verifyIsAdmin,  postAlbum);
router.delete("/:id", verifyToken, verifyIsAdmin, deleteAlbum);

module.exports = router;
