const express = require("express");
const router = express.Router();
const {
    // FindSearchedDataInAllEntries,
    getSearchResults,
} = require("../controllers/searchController");
const { verifyToken } = require("../middleware/authMiddleware");

// router.get("/search", FindSearchedDataInAllEntries);
router.get("/category/:categoryName/search/:searchQuery", getSearchResults);
router.get("/category/:categoryName", getSearchResults)
router.get("/search/:searchQuery", getSearchResults)
router.get("/", getSearchResults)



module.exports = router;