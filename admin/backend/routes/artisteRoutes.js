const express = require("express");
const router = express.Router();
const {
  getAllArtistes,
  getArtisteDetails,
  postArtiste,
} = require("../controllers/artisteController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllArtistes);
router.get("/:artisteId", getArtisteDetails);
router.post("/", verifyToken, postArtiste);

module.exports = router;
