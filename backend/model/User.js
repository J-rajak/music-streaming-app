const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  username: { type: String, required: true },
  likedSongs: {type :String, default: ""},
  likedPlaylists: {type: String, default: ""},
  subscribedArtists: {type: String, default: ""},
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

