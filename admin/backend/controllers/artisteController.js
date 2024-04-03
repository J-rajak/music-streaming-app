const Artiste = require("../models/Artiste");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");
const { shuffleArray } = require("../utils/index");

// post artiste
const postArtiste = asyncHandler(async (req, res) => {
  const { name, bio } = req.body;

  const uploadImage = await cloudinary.uploader.upload(req.file.path, {
    transformation: [{ quality: "auto", width: 200, height: 200 }],
    folder: "echosync/artiste",
  });

  const newArtiste = new Artiste({
    name,
    bio,
    image: uploadImage.secure_url,
  });

  await newArtiste.save();
  if (!newArtiste) {
    res.status(500).json({ message: "Failed to create artiste" });
  }
  res.status(201).json(newArtiste);
});

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
  postArtiste,
  getAllArtistes,
  getArtisteDetails,
};
