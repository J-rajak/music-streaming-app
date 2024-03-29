const Artiste = require("../models/Artiste");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");


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

module.exports = {
  postArtiste,
};
