const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  track: { type: String, required: false },
  owner: { type: mongoose.Types.ObjectId, ref: "user" },
  songs: [{ type: String, ref: "song" }],
  collaborators: [{ type: mongoose.Types.ObjectId, ref: "user" }],
});

const PlaylistModel = mongoose.model("Playlist", playlistSchema);

module.exports = PlaylistModel;
