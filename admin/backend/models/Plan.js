const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    planType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    features: {
      type: [String],
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
