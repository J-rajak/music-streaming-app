import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/

export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // check the existing users

    // const existUsername = new Promise((resolve, reject) => {

    //   UserModel.findOne({ username }, function (err, user) {
    //     if (err) reject(new Error(err));
    //     if (user) reject({ error: "Please use unique username" });
    //     resolve();
    //   });
    // });

    const user = await UserModel.findOne({username});

    if(user) {
        throw new Error("Please use a unique username")
    }
    return true;

    // check for existing email

    const existEmail = new Promise((resolve, reject) => {
        
      UserModel.findOne({ email }, function (err, email) {
        if (err) reject(new Error(err));
        if (email) reject({ error: "Please use unique Email" });

        resolve();
      });
    });

    // Promise.all([existUsername, existEmail]).then(() => {
    //   if (password) {
    //     bcrypt.hash(password, 10).then((hashedPassword) => {
    //       const user = new UserModel({
    //         username,
    //         password: hashedPassword,
    //         profile: profile || "",
    //         email,
    //       });

    //       // return saved result as a response

    //       user
    //         .save()
    //         .then((result) =>
    //           res.status(201).send({ msg: "User registered successfully" })
    //         )
    //         .catch((error) => res.status(500).send({ error }));
    //     });
    //   }
    // });
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function login(req, res) {
  res.json("login route");
}

export async function getUser(req, res) {
  res.json("get User route");
}

export async function updateUser(req, res) {
  res.json("Update user route");
}

export async function generateOTP(req, res) {
  res.json("Generate OTP route");
}

export async function verifyOTP(req, res) {
  res.json("verify OTP route");
}

export async function createResetSession(req, res) {
  res.json("createResetSession route");
}

export async function resetPassword(req, res) {
  res.json("resetPassword route");
}
