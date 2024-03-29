// const User = require("../models/User");
const Artiste = require("../models/Artiste");
const Album = require("../models/Album");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");


// upload album
const postAlbum = asyncHandler(async (req, res) => {
  const { title, artiste, releaseDate, genre, songs } = req.body;

  const foundArtiste = await Artiste.findOne({ name: artiste });

  if (!foundArtiste) {
    res.status(404).json({ message: "User not found" });
  }

  const foundSongs = await Song.findOne({ title: songs });

  if (!foundSongs) {
    res.status(404).json({ message: "song not found" });
  }

  const uploadImage = await cloudinary.uploader.upload(req.file.path, {
    transformation: [{ quality: "auto", height: 200, width: 200 }],
    folder: "echosync/albums",
  });

  const newAlbum = new Album({
    title,
    releaseDate,
    genre,
    coverImage: uploadImage.secure_url,
    artiste: foundArtiste._id,
    songs: foundSongs._id,
  });

  await newAlbum.save();
  if (!newAlbum) {
    res.status(404).json({ message: "album not appended" });
  }
  res.status(201).json(newAlbum);
});
