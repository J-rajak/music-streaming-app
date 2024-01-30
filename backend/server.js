const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const User = require("./model/User.js");
const morgan = require("morgan");
const connect = require("./db/conn.js");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
dotenv.config();
const app = express();
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const port = 8080;

// app.use('/api', router);

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server Connected to http://localhost:${port}`);
      });
    } catch (err) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((err) => {
    console.log("Invalid dbs connection....!");
  });

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

app.get("/", (req, res) => {
  res.status(201).json("Home Get Request");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);
