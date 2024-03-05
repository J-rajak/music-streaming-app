const express = require("express");
const router = express.Router();
const {
    FindSearchedDataInAllEntries
} = require("../controllers/searchController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/:searchString", FindSearchedDataInAllEntries);

module.exports = router;