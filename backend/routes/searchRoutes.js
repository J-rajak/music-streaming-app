const express = require("express");
const router = express.Router();
const {
    FindSearchedDataInAllEntries
} = require("../controllers/searchController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", FindSearchedDataInAllEntries);

module.exports = router;