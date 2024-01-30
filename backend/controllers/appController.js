// import UserModel from "../model/User.js";
// import bcrypt from "bcrypt";

// /** POST: http://localhost:8080/api/register 
//  * @param : {
//   "username" : "example123",
//   "password" : "admin123",
//   "email": "example@gmail.com",
//   "firstName" : "bill",
//   "lastName": "william",
//   "mobile": 8009860560,
//   "address" : "Apt. 556, Kulas Light, Gwenborough",
//   "profile": ""
// }
// */

// export async function register(req, res) {
//   try {
//     const { username, profile, email } = req.body;

//     // check the existing users and hash password
//     const user = await UserModel.findOne({ username });
//     const password = req.body.password;
//     const salt = await bcrypt.genSaltSync(10);
//     const hashedPassword = await bcrypt.hashSync(password, salt);
//     req.body.password = hashedPassword;
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(200)
//         .send({ message: "User already exists", success: false });
//     } else {
//       const user = new UserModel({
//         username,
//         password: hashedPassword,
//         profile: profile || "",
//         email,
//       });
//       await UserModel.save();
//       return res.status({
//         message: "User registered successfully",
//         success: true,
//       });
//     }

//     // check for existing email

//     // Promise.all([existUsername, existEmail]).then(() => {
//     //   if (password) {
//     //     bcrypt.hash(password, 10).then((hashedPassword) => {
//     //       const user = new UserModel({
//     //         username,
//     //         password: hashedPassword,
//     //         profile: profile || "",
//     //         email,
//     //       });

//     //       // return saved result as a response

//     //       user
//     //         .save()
//     //         .then((result) =>
//     //           res.status(201).send({ msg: "User registered successfully" })
//     //         )
//     //         .catch((error) => res.status(500).send({ error }));
//     //     });
//     //   }
//     // });
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// }

// export async function login(req, res) {
//   res.json("login route");
// }

// export async function getUser(req, res) {
//   res.json("get User route");
// }

// export async function updateUser(req, res) {
//   res.json("Update user route");
// }

// export async function generateOTP(req, res) {
//   res.json("Generate OTP route");
// }

// export async function verifyOTP(req, res) {
//   res.json("verify OTP route");
// }

// export async function createResetSession(req, res) {
//   res.json("createResetSession route");
// }

// export async function resetPassword(req, res) {
//   res.json("resetPassword route");
// }
