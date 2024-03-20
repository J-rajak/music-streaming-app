const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");
const asyncHandler = require("express-async-handler");
const { shuffleArray } = require("../utils/index");

// Get all playlists
//get api/playlists

const getAllPlaylists = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const playlists = await Playlist.find({})
    .limit(limit)
    .populate("createdBy", "username")
    .lean();
  if (!playlists.length) {
    return res.status(404).json({ message: "No playlists found" });
  }
  const shuffledPlaylists = shuffleArray(playlists);
  res.status(200).json(shuffledPlaylists);
});

//get specific playlist
// api/playlists/:playlistId
const getPlaylistDetails = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findById(playlistId)
    .populate("createdBy", "username")
    .populate({
      path: "songs",
      select: "title coverImage duration audioURL artiste album",
      populate: [
        { path: "artiste", select: "name" },
        { path: "album", select: "title" },
      ],
    })
    .lean()
    .exec();

  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found" });
  }
  res.status(200).json(playlist);
});

// create a playlist
// Post api/playlists/
const createPlaylist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const playlist = await Playlist.create({
    title,
    description,
    createdBy: user._id,
  });

  if (!playlist) {
    return res.status(400).json({ message: "Playlist creation failed" });
  }
  await user.updateOne({ $push: { playlist: playlist._id } });
  res.status(201).json(playlist);
});

// add a song to playlist
// POST api/playlists/:playlistId/songs/:songId
const addSongToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, songId } = req.params;
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  if (!playlist.songs.includes(songId)) {
    playlist.songs.push(songId);
    if (playlist.songs.length === 1) {
      const song = await Song.findById(songId);
      if (song) {
        playlist.coverImage = song.coverImage;
      }
    }
    await playlist.save();
  }
  res.status(200).json({ message: "Song added to playlist" });
});

// Like a playlist
// POST api/playlists/:playlistId/like
const likePlaylist = asyncHandler(async (req, res) => {
  const playlistId = req.params.playlistId;
  const userId = req.user.id;
  const playlist = await Playlist.findById(playlistId);
  const user = await User.findById(userId);
  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  //check if user already liked a playlist
  const toogled = await playlist.toogleLike(userId);
  //update user favorite playlists if like was toogled
  if (toogled) {
    user.favoritePlaylists.push(playlistId);
  } else {
    user.favoritePlaylists.pull(playlistId);
  }

  await user.save();
  res.status(200).json({ message: "Like status toogled" });
});

module.exports = {
    getAllPlaylists,
    getPlaylistDetails,
    createPlaylist,
    addSongToPlaylist,
    likePlaylist,
  };
  