const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, default: 0 },
    createdBy: { type: String, default: "admin" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);