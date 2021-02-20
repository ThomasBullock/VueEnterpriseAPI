const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  founded: {
    type: Number,
    required: true,
  },
  logo: {
    type: String,
  },
  premierships: [Number],
  captainID: {
    type: mongoose.Schema.ObjectId,
    ref: "Player",
  },
  colours: [String],
});

module.exports = Team = mongoose.model("Team", teamSchema);
