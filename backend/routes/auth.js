const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

router.post("/register", async (req, res) => {
  // req.body will be in the format {email, username, password, firstName, lastName}

  const { email, password, firstName, lastName, username } = req.body;
  console.log(req.body);
  // check if user already exist
  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(403)
      .json({ error: "A user with this email already exists" });
  }
  // valid email
  // create a new user
  const hashedPassword = bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
  };
  const newUser = await User.create(newUserData);

  // create a token to return to the user
  const token = await getToken(email, newUser);

  // return result to the user
  const userToReturn = { ...newUser.toJSON(), token };
  console.log(userToReturn);
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  console.log(user);
  if (!user) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  const token = await getToken(user.email, user);
  const userToReturn = {...user.toJSON(), token};
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

module.exports = router;
