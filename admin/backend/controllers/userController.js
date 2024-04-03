const User = require("../models/User")
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");

// admin functionalities

//get users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
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
  
    await user.save();
    res.status(200).json(user);
  });
  
  // Delete user
  const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).send("user removed");
  });

  module.exports ={ 
    getUsers,
    updateUser,
    deleteUser,
  }