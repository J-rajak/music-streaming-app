const express = require("express");
const router = express.Router();
const {
  getSearchResults,
} = require("../controllers/searchController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getSearchResults);

module.exports = router;
