const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    if (connect) {
      console.log("MongoDB connection SUCCESS");
    } else {
      console.log("MongoDB connection FAIL!!!");
    }
  } catch (error) {
    console.error("MongoDB connection FAIL ");
    process.exit(1);
  }
};

module.exports = connectDB;
