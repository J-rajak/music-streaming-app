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

const deleteArtiste = asyncHandler(async (req, res) => {
  const artisteId = req.params.id;

  const artiste = await Artiste.findByIdAndDelete(artisteId);
  const albums = await Album.find({ artiste: artisteId });

  if (!artiste) {
    res.status(404);
    throw new Error("Artiste not found");
  }

  if (albums.length > 0) {
    // Delete all albums associated with the artiste
    await Album.deleteMany({ artiste: artisteId });
  }

  res.json({ message: "Artiste and associated albums removed" });
});

module.exports = {
  getAllArtistes,
  getArtisteDetails,
  deleteArtiste,
};
