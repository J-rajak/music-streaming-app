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
    .select("username bio country image playlist isAdmin isPremium")
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
    .select(
      "username bio country image isAdmin isPremium playlist, favoriteArtistes"
    )
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

// admin functionality

//get users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json(users);
});

//get a single user
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select(
    "username email isAdmin isPremium"
  );
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  res.status(200).send(user);
  next();
});

//update user
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin;
  user.isPremium = req.body.isPremium;
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const deleteUser = await User.findByIdAndDelete(userId);
  if (!deleteUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "user deleted successfully" });
});

//upload song
const uploadSong = asyncHandler(async (req, res) => {
  const { title, artiste, duration, genre, lyrics } = req.body;
  const { coverImage, audioURL } = req.file;

  const songUploadResponse = await cloudinary.uploader.upload(
    audioURL[0].path,
    {
      folder: "echosync/songs",
      resource_type: "mp3",
    }
  );

  const imageUploadResponse = await cloudinary.uploader.upload(
    coverImage[0].path,
    {
      transformation: [{ quality: "auto", width: 200, height: 200 }],
      folder: "echosync/songs/coverImage",
    }
  );

  const newSong = new Song({
    title,
    artiste,
    duration,
    releaseDate,
    genre,
    lyrics,
    audioURL: songUploadResponse.secure_url,
    coverImage: imageUploadResponse.secure_url,
  });

  await newSong.save();
  if (!newSong) {
    res.status(500).json({ message: "Failed to upload song" });
  }

  res.status(201).json(newSong);
});

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

module.exports = {
  getUserDetails,
  getCurrentUser,
  editUserDetails,
  uploadImage,
  getUsers,
  deleteUser,
};
