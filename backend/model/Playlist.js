const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  songs: [{ type: String, ref: "Song" }],
  collaborators: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

const PlaylistModel = mongoose.model("Playlist", playlistSchema);

module.exports = PlaylistModel;
