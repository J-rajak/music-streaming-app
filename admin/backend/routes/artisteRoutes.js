const express = require("express");
const router = express.Router();
const {
  getAllArtistes,
  getArtisteDetails,
  deleteArtiste,
} = require("../controllers/artisteController");
const { verifyToken, verifyIsAdmin } = require("../middleware/authMiddleware");

router.get("/", verifyToken, verifyIsAdmin, getAllArtistes);
router.get("/:artisteId", verifyToken, verifyIsAdmin, getArtisteDetails);
router.delete("/:id", verifyToken, verifyIsAdmin, deleteArtiste);

module.exports = router;
