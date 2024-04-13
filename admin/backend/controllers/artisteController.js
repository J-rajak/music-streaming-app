const Artiste = require("../models/Artiste");
const Song = require("../models/Song");
const Album = require("../models/Album");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");
const { shuffleArray } = require("../utils");

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

module.exports = {
  getAllArtistes,
  getArtisteDetails,
};
