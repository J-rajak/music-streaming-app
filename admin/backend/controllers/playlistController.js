const Playlist = require("../models/Playlist");
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

const deletePlaylist = asyncHandler(async (req, res) => {
  const playlistId = req.params.id;
  
  const playlist = await Playlist.findById(playlistId);

  if (playlist) {
    await playlist.deleteOne({ _id: playlist._id });
    res.json({ message: "Playlist removed" });
  } else {
    res.status(404);
    throw new Error("Error while deleting playlist");
  }
});
module.exports = {
  getAllPlaylists,
  getPlaylistDetails,
  deletePlaylist,
};
