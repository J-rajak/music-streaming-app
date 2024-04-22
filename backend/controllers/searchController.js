const Artiste = require("../models/Artiste");
const Song = require("../models/Song");
const Album = require("../models/Album");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { shuffleArray } = require("../utils/index");

// GET api/search
const FindSearchedDataInAllEntries = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const searchQuery = req.query.searchString;
  const filter = req.query.filter; // Parse the filter option if needed

  let entries = [];

  // Fetch entries based on the filter option, if provided
  switch (filter) {
    case "artist":
      entries = await Artiste.find({
        name: { $regex: new RegExp(searchQuery, "i") },
      })
        .limit(limit)
        .lean();
      break;
    case "genre":
      entries = await Song.find({
        genre: { $regex: new RegExp(searchQuery, "i") },
      })
        .limit(limit)
        .lean();
      break;
    case "song":
      entries = await Song.find({
        title: { $regex: new RegExp(searchQuery, "i") },
      })
        .limit(limit)
        .lean();
      break;
    default:
      const artistes = await Artiste.find({
        name: { $regex: new RegExp(searchQuery, "i") },
      })
        .limit(limit)
        .lean();
      const genres = await Album.find({
        genre: { $regex: new RegExp(searchQuery, "i") },
      })
        .limit(limit)
        .lean();
      const songs = await Song.find({
        title: { $regex: new RegExp(searchQuery, "i") },
      })
        .limit(limit)
        .lean();
      entries = [
        ...artistes.map((artist) => ({ type: "artist", name: artist.name })),
        ...genres.map((genre) => ({ type: "genre", name: genre.genre })),
        ...songs.map((song) => ({ type: "song", name: song.title })),
      ];
      break;
  }
  console.log(entries);
  // Return the filtered dataset
  res.status(200).json(entries);
});

const getSearchResults = async (req, res, next) => {
  try {
    let query = {};
    let queryCondition = false;

    let genreQueryCondition = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      queryCondition = true;
      let a = categoryName.replaceAll(",", "/");
      var regEx = new RegExp("^" + a);
      genreQueryCondition = { category: regEx };
    }
    if (req.query.category) {
      queryCondition = true;
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });
      genreQueryCondition = {
        category: { $in: a },
      };
    }

    //pagination
    const pageNum = Number(req.query.pageNum) || 1;

    const searchQuery = req.params.searchQuery || "";
    let searchQueryCondition = {};
    let select = {};
    if (searchQuery) {
      queryCondition = true;
      searchQueryCondition = { $text: { $search: searchQuery } };
      select = {
        score: { $meta: "textScore" },
      };
    }

    if (queryCondition) {
      query = {
        $and: [genreQueryCondition, searchQueryCondition],
      };
    }

    // const totalSongs = await Song.countDocuments(query);
    const songs = await Song.find(query).select(select);

    res.json({
      songs,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { FindSearchedDataInAllEntries, getSearchResults };
