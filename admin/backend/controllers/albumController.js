// const User = require("../models/User");
const Artiste = require("../models/Artiste");
const Album = require("../models/Album");
const Song = require("../models/Song");
const asyncHandler = require("express-async-handler");
const { shuffleArray } = require("../utils");
const cloudinary = require("../config/cloudinary");

// upload album
// post admin/albums/
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

// GET all albums
// GET admin/albums
const getAllAlbums = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const albums = await Album.find({})
    .limit(limit)
    .lean()
    .populate("artiste", "name");
  if (!albums.length) {
    return res.status(404).json({ message: "No albums found" });
  }
  const shuffledAlbums = shuffleArray(albums);
  res.status(200).json(shuffledAlbums);
});

// Get specific albums
// GET admin/albums/:albumId
const getAlbumDetails = asyncHandler(async (req, res) => {
  const { albumId } = req.params;
  const album = await Album.findById(albumId)
    .populate("artiste", "name")
    .populate("songs")
    .lean();

  if (!album) {
    return res.status(404).json({ message: "Album not found" });
  }
  return res.status(200).json(album);
});

const deleteAlbum = asyncHandler(async (req, res) => {
  const albumId = req.params.id;

  const album = await Album.findById(albumId);

  if (album) {
    await album.deleteOne({ _id: album._id });
    res.json({ message: "Album removed" });
  } else {
    res.status(404);
    throw new Error("Error while deleting album");
  }
});

module.exports = { getAllAlbums, getAlbumDetails, postAlbum, deleteAlbum };
