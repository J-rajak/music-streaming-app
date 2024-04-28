const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    bio: String,
    country: String,
    image: { type: String },
    googleId: String,
    facebookId: String,
    twitterId: String,
    playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
    favoriteSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    favoriteAlbums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
    favoriteArtistes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artiste",
      },
    ],
    favoritePlaylists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
    isPremium: {
      type: Boolean,
      required: false,
      default: false,
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    phone: {
      type: String,
    },
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
    membershipStartDate: {
      type: Date,
    },
    membershipEndDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model("User", UserSchema);
