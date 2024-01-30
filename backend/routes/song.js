const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../model/Song");
const User = require("../model/User");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // req.user gets the user because it authenticates the user
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "Insufficient details to create song" });
    }
    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  }
);

// get route to get all songs
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // get all songs where artist id == currentUser._id
    const songs = await Song.find({ artist: req.user._id });
    return res.status(200).json({ data: songs });
  }
);

//get all songs any artist has published
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.params;
    //check if artist exists
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Artist does not exist" });
    }

    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
  }
);

//route to get a song by name
router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.params;

    // name: songName 
    // pattern matching instead of direct text matching
    const songs = await Song.find({ name: songName });
    return res.status(200).json({ data: songs });
  }
);

module.exports = router;
