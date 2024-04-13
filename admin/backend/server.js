const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT;
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const songRoutes = require("./routes/songRoutes");
const artisteRoutes = require("./routes/artisteRoutes");
const albumRoutes = require("./routes/albumRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
// const { errorHandler } = require("./middleware/errorHandler");

// Configure CORS to allow requests only from 'http://localhost:5173'
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

// Your other routes and middleware

connectDB();

require("./config/passport")(passport);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to echosync admin server");
});

app.use("/admin/auth", authRoutes);
app.use("/admin/users", userRoutes);
app.use("/admin/songs", songRoutes);
app.use("/admin/artistes", artisteRoutes);
app.use("/admin/albums", albumRoutes);
app.use("/admin/playlists", playlistRoutes);

const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  // port: 587,
  // secure: false,
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

// testing nodemailer success
// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready for message");
//     console.log(success);
//   }
// });

app.post("/sendMail", async (req, res) => {
  // const { to, subject, message } = req.body;
  // const mailOptions = {
  //   from: process.env.AUTH_EMAIL,
  //   to: to,
  //   subject: subject,
  //   text: message,
  // };

  // transporter
  //   .sendMail(mailOptions)
  //   .then(() => {
  //     res.json({ message: "SUCCESS", message: "Message sent successfully" });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.json({ status: "FAILED", message: "An error occurred" });
  //   });

  const info = await transporter.sendMail({
    from: process.env.AUTH_EMAIL, // sender address
    to: "rajak.jeron@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
