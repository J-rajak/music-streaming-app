const User = require("../models/User");
const Song = require("../models/Song");
const Artiste = require("../models/Artiste");
const Album = require("../models/Album");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");

// Get specific user
// api/users/:userId
const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId)
    .select("username email bio country image playlist isPremium")
    .populate({
      path: "playlist",
      select: "title coverImage",
      populate: { path: "createdBy", select: "username" },
    })
    .lean()
    .exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

//Get current user
// Get api/users/currentUser
const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId)
    .select("username bio country image isPremium playlist, favoriteArtistes")
    .populate({
      path: "playlist",
      select: "title coverImage",
      populate: { path: "createdBy", select: "username" },
    })
    .populate({
      path: "favoriteSongs",
      select: "title audioURL coverImage",
      populate: { path: "artiste", select: "name" },
    })
    .populate({
      path: "favoriteAlbums",
      select: "title coverImage",
      populate: { path: "artiste", select: "name" },
    })
    .populate({
      path: "favoritePlaylists",
      select: "title coverImage",
      populate: { path: "createdBy", select: "username" },
    })
    .lean()
    .exec();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

//user
// Update user details PATCH api/users/edit
const editUserDetails = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { bio, country, image } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { bio, country, image },
    { new: true }
  );
  if (!updatedUser) {
    return res
      .status(404)
      .json({ message: "An error occurred while updating the user" });
  }
  res.status(200).json(updatedUser);
});

// Upload profile image
// POST api/users/upload
const uploadImage = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const publicId = user.image?.split("/").pop().split(".")[0];
  if (!publicId) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      transformation: [{ quality: "auto", width: 200, height: 200 }],
      folder: "echosync/users",
    });
    await user.updateOne({ image: result.secure_url });
  } else {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: publicId,
      overwrite: true,
      transformation: [{ quality: "auto", width: 200, height: 200 }],
      folder: "echosync/users",
    });
    await user.updateOne({ image: result.secure_url });
  }
  res.status(200).json({ message: "Profile image successfully uploaded" });
});

// premium user functionality

//upload song
const uploadSong = asyncHandler(async (req, res) => {
  const { title, duration, genre, lyrics, coverImage, audioURL } = req.body;
  const userId = req.user.id;

  if (!title || !duration || !coverImage || !audioURL || !genre) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // let artisteId;
  // // Check if artiste exists
  // const existingArtiste = await Artiste.findOne({ user: userId });
  // if (existingArtiste) {
  //   artisteId = existingArtiste._id;
  // } else {
  //   // Create new artiste
  //   const newArtiste = new Artiste({
  //     _id : userId,
  //     name: req.user.username,
  //     bio: req.user.bio,
  //     image: req.user.image,
  //   });
  //   const savedArtiste = await newArtiste.save();
  //   // artisteId = savedArtiste._id;
  // }

  const newSong = new Song({
    title,
    artiste: userId,
    duration,
    genre,
    lyrics,
    audioURL,
    coverImage,
  });

  await newSong.save();
  if (!newSong) {
    res.status(500).json({ message: "Failed to upload song" });
  }

  res.status(200).json(newSong);
});

//upload album
const uploadAlbum = asyncHandler(async (req, res) => {
  const { title, duration, genre, lyrics, coverImage, audioURL } = req.body;
  const userId = req.user.id;

  if (!title || !duration || !coverImage || !audioURL || !genre) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // let artisteId;
  // // Check if artiste exists
  // const existingArtiste = await Artiste.findOne({ user: userId });
  // if (existingArtiste) {
  //   artisteId = existingArtiste._id;
  // } else {
  //   // Create new artiste
  //   const newArtiste = new Artiste({
  //     _id : userId,
  //     name: req.user.username,
  //     bio: req.user.bio,
  //     image: req.user.image,
  //   });
  //   const savedArtiste = await newArtiste.save();
  //   // artisteId = savedArtiste._id;
  // }

  const newSong = new Song({
    title,
    artiste: userId,
    duration,
    genre,
    lyrics,
    audioURL,
    coverImage,
  });

  await newSong.save();
  if (!newSong) {
    res.status(500).json({ message: "Failed to upload song" });
  }

  res.status(200).json(newSong);
});

module.exports = {
  getUserDetails,
  getCurrentUser,
  editUserDetails,
  uploadImage,
  uploadSong,
  uploadAlbum,
};
