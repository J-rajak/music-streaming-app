const Artiste = require("../models/Artiste");
const Song = require("../models/Song");
const Album = require("../models/Album");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { shuffleArray } = require("../utils/index");

// get all artists
// GET api/artistes

const getAllArtistes = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const artistes = await Artiste.find({}).limit(limit).lean();
  if (!artistes.length) {
    return res.status(404).json({ message: "No artistes found" });
  }
  const shuffledArtistes = shuffleArray(artistes);
  res.status(200).json(shuffledArtistes);
});

// GET specific artiste
// api/artistes/:artisteId
const getArtisteDetails = asyncHandler(async (req, res) => {
  const { artisteId } = req.params;
  const artiste = await Artiste.findById(artisteId).lean();
  if (!artiste) {
    return res.status(404).json({ message: "Artiste not found" });
  }
  const songs = await Song.find({
    artiste: artisteId,
  })
    .lean()
    .exec();
  const albums = await Album.find({ artiste: artisteId }).lean().exec();
  res.status(200).json({ artiste, songs, albums });
});

// Like an artiste
// POST api/artiste/:artisteId/like
const likeArtiste = asyncHandler(async (req, res) => {
  const artisteId = req.params.artisteId;
  const userId = req.user.id;
  const artiste = await Artiste.findById(artisteId);
  const user = await User.findById(userId);
  if (!artiste) {
    return res.status(404).json({ message: "Artiste not found" });
  }

  //check if user already liked an artiste
  const toogled = await artiste.toogleLike(userId);
  //update user favorite artistes if like was toogled
  if (toogled) {
    user.favoriteArtistes.push(artisteId);
  } else {
    user.favoriteArtistes.pull(artisteId);
  }
  await user.save();
  res.status(200).json({ message: "Like status toogled" });
});

module.exports = { getAllArtistes, getArtisteDetails, likeArtiste };
