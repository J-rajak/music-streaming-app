const Song = require("../models/Song");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { shuffleArray } = require("../utils/index");

// Get all songs
// Get api/songs
const getAllSongs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const [songs, total] = await Promise.all([
    Song.find({})
      .skip(startIndex)
      .limit(limit)
      .populate("artiste", "name")
      .lean(),
    Song.countDocuments(),
  ]);

  if (!songs.length) {
    return res.status(404).json({ message: "No songs found" });
  }
  const shuffledSongs = shuffleArray(songs);
  res.status(200).json({ songs: shuffledSongs, total });
});

// Get specific song
// api/songs/:songId
const getSongDetails = asyncHandler(async (req, res) => {
  const songId = req.params.songId;
  const song = await Song.findById(songId)
    .populate("artiste", "name")
    .populate("album", "title")
    .populate({ path: "comments.user", select: "username image" })
    .lean()
    .exec();
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }
  song.comments.sort((a, b) => b.createdAt - a.createdAt);

  res.status(200).json(song);
});

module.exports = {
  getAllSongs,
  getSongDetails,
};
