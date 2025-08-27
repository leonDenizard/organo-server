const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: Number,
    required: true,
    unique: true
  },
  color: {
    type: String,
    default: "#000000"
  },
  description: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Status", StatusSchema);
