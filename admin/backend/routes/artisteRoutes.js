const express = require("express");
const router = express.Router();
const {
  getAllArtistes,
  getArtisteDetails,
} = require("../controllers/artisteController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllArtistes);
router.get("/:artisteId", getArtisteDetails);

module.exports = router;
