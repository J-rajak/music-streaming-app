const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema({
  userId: String,
  resetString: String,
  createdAt: Date,
  expiresAt: Date,
});

module.exports = mongoose.model("PasswordReset", passwordResetSchema);
