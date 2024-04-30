const User = require("../models/User");
const Plan = require("../models/Plan");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");

// admin functionalities

const newPlan = asyncHandler(async (req, res) => {
  const { title, planType, description, features, price } = req.body;

  if (!title || !planType || !description || !features || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const plan = new Plan({
    title: title,
    planType: planType,
    description: description,
    features: features,
    price: price,
  });

  await plan.save();

  res.status(201).json({ message: "Plan created successfully", plan });
});


//get users
// admin/users/
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//Get current user
// Get admin/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      image: user.image,
      bio: user.bio,
      country: user.country,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// put admin/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.bio = req.body.bio || user.bio;
    user.country = req.body.country || user.country;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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

//update user
//admin/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    // user.isAdmin = Boolean(req.body.isAdmin);
    // user.isPremium = Boolean(req.body.isPremium);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      // isAdmin: updatedUser.isAdmin,
      // isPremium: updatedUser.isPremium,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//admin/users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Delete user
//admin/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  newPlan,
  uploadImage,
  getUsers,
  getUserProfile,
  updateUserProfile,
  getUserById,
  updateUser,
  deleteUser,
};
