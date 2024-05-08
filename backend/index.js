const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const axios = require("axios");
require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT;
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const songRoutes = require("./routes/songRoutes");
const artisteRoutes = require("./routes/artisteRoutes");
const albumRoutes = require("./routes/albumRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const searchRoutes = require("./routes/searchRoutes");
const { errorHandler } = require("./middleware/errorHandler");

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
  res.send("Welcome to echosync. Enjoy our rich collection of music");
});

app.use("/auth", authRoutes);
app.use("/api/", searchRoutes);
app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/artistes", artisteRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/playlists", playlistRoutes);
app.use(errorHandler);

app.post("/khalti-checkout", async (req, res) => {
  const payload = req.body;
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
    res.json({
      success: true,
      data: khaltiResponse?.data,
    });
  } else {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
  console.log(khaltiResponse);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
