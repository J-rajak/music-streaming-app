require("dotenv").config({ path: "./config/.env" });
const User = require("../models/User");
const Song = require("../models/Song");
const Artiste = require("../models/Artiste");
const axios = require("axios");
const Album = require("../models/Album");
const Plan = require("../models/Plan");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  // port: 587,
  // secure: false,
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

// testing nodemailer success
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    // console.log("Ready for message in user");
    console.log(success);
  }
});

// Get specific user
// api/users/:userId
const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId)
    .select("username email bio country image playlist isPremium")
    .populate({
      path: "playlist",
      select: "title coverImage",
      populate: { path: "createdBy", select: "username" },
    })
    .lean()
    .exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

//Get current user
// Get api/users/currentUser
const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId)
    .select(
      "username bio country image membership membershipStartDate membershipEndDate membershipTrial isPremium playlist, favoriteArtistes"
    )
    .populate({
      path: "playlist",
      select: "title coverImage",
      populate: { path: "createdBy", select: "username" },
    })
    .populate({
      path: "favoriteSongs",
      select: "title audioURL coverImage",
      populate: { path: "artiste", select: "name" },
    })
    .populate({
      path: "favoriteAlbums",
      select: "title coverImage",
      populate: { path: "artiste", select: "name" },
    })
    .populate({
      path: "favoritePlaylists",
      select: "title coverImage",
      populate: { path: "createdBy", select: "username" },
    })
    .lean()
    .exec();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

//user
// Update user details PATCH api/users/edit
const editUserDetails = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { bio, country, image } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { bio, country, image },
    { new: true }
  );
  if (!updatedUser) {
    return res
      .status(404)
      .json({ message: "An error occurred while updating the user" });
  }
  res.status(200).json(updatedUser);
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

// premium user functionality

//upload song
const uploadSong = asyncHandler(async (req, res) => {
  const { title, duration, genre, lyrics, coverImage, audioURL } = req.body;
  const userId = req.user.id;

  if (!title || !duration || !coverImage || !audioURL || !genre) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  let artisteId;
  // Check if artiste exists
  const existingArtiste = await Artiste.findOne({ _id: userId });
  if (!existingArtiste) {
    // Create new artiste if not exists
    const newArtiste = new Artiste({
      _id: userId,
      name: req.user.username,
      bio: req.user.bio,
      image: req.user.image,
    });
    await newArtiste.save();
    existingArtiste = newArtiste; // Assign the newly created artiste
  }

  const newSong = new Song({
    title,
    artiste: existingArtiste._id,
    duration,
    genre,
    lyrics,
    audioURL,
    coverImage,
  });

  await newSong.save();
  if (!newSong) {
    res.status(500).json({ message: "Failed to upload song" });
  }

  res.status(200).json(newSong);
});

//upload album
const uploadAlbum = asyncHandler(async (req, res) => {
  const { title, genre, songs, coverImage } = req.body;
  const userId = req.user.id;

  if (!title || !coverImage || !genre) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newAlbum = new Album({
    title,
    artiste: userId,
    releaseDate: Date.now(),
    songs,
    genre,
    coverImage,
  });

  await newAlbum.save();
  if (!newAlbum) {
    res.status(500).json({ message: "Failed to upload Album" });
  }

  res.status(200).json(newAlbum);
});

const onSubscribePlan = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const paidPlanId = req.params.paidPlanId;

    const paidPlan = await Plan.findById(paidPlanId);
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: "No user found" });
    }

    // Update subscription details if the user is eligible
    foundUser.membershipStartDate = new Date();
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + 30);
    foundUser.membershipEndDate = expDate;
    foundUser.membership = paidPlan;
    foundUser.isPremium = true; // Set isPremium to true

    // Mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: foundUser.email,
      subject: "Paid Subscription Activated",
      html: `
        <p>Dear ${foundUser.username},</p>
        <p>Congratulations! You are now a premium member of EchoSync.</p>
        <p>Your premium membership will expire on ${expDate.toDateString()}.</p>
        <p>Thank you for choosing EchoSync!</p>
        <p>Best regards,<br>The EchoSync Team</p>
      `,
    };

    await foundUser.save();
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Paid subscription activated successfully" });
  } catch (error) {
    console.error("Error in onFreeSubscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const onUnsubscribePlan = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: "No user found" });
    }

    foundUser.membership = null;
    foundUser.isPremium = false;
    foundUser.membershipStartDate = null;
    foundUser.membershipEndDate = null;

    // Mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: foundUser.email,
      subject: "Cancellation of Subscription to EchoSync",
      html: `
        <p>Dear ${foundUser.username},</p>
        <p>Sorry! You are have cancelled the subscription.</p>
        <p>Best regards,<br>The EchoSync Team</p>
      `,
    };

    await foundUser.save();
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Cancellation of subscription successful" });
  } catch (error) {
    console.error("Error while cancelling  subscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find({});

  if (!plans || plans.length === 0) {
    res.status(404).json({ message: "No plans found" });
  }

  res.status(200).json(plans);
});

const khaltiPayment = asyncHandler(async (req, res) => {
  const payload = req.body;
  try {
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

    if (khaltiResponse) {
      // Sending email notification
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: payload.customer_info.email,
        subject: "Payment Initiated with Khalti",
        html: `
          <p>Dear ${payload.customer_info.name},</p>
          <p>Your payment has been initiated successfully.</p>
          <p>Transaction ID: ${khaltiResponse.data.pidx}</p>
          <p>Thank you for choosing EchoSync!</p>
          <p>Best regards,<br>The EchoSync Team</p>
        `,
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      res.json({
        success: true,
        data: khaltiResponse?.data,
      });
    } else {
      res.json({
        success: false,
        message: "Something went wrong",
      });
    }
    // console.log(khaltiResponse);
  } catch (error) {
    console.error("Error in khaltiPayment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const onFreeSubscription = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const freePlanId = req.params.freePlanId;

    const freePlan = await Plan.findById(freePlanId);
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: "No user found" });
    }

    // Check if the user's trial period is over
    if (foundUser.membershipTrial === true) {
      return res.status(400).json({ message: "User's trial period is over" });
    }

    // Update subscription details if the user is eligible
    foundUser.membershipStartDate = new Date();
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + 30);
    foundUser.membershipEndDate = expDate;
    foundUser.membership = freePlan;
    foundUser.membershipTrial = true; // Assuming the user's trial starts now
    foundUser.isPremium = true; // Set isPremium to true

    // Mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: foundUser.email,
      subject: "Free Subscription to EchoSync Activated",
      html: `
        <p>Dear ${foundUser.username},</p>
        <p>Congratulations! You are now a premium member of EchoSync.</p>
        <p>Your premium membership will expire on ${expDate.toDateString()}.</p>
        <p>Thank you for choosing EchoSync!</p>
        <p>Best regards,<br>The EchoSync Team</p>
      `,
    };

    await foundUser.save();
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Free subscription activated successfully" });
  } catch (error) {
    console.error("Error in onFreeSubscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  getUserDetails,
  getCurrentUser,
  editUserDetails,
  uploadImage,
  uploadSong,
  uploadAlbum,
  onSubscribePlan,
  onUnsubscribePlan,
  getPlans,
  khaltiPayment,
  onFreeSubscription,
};
