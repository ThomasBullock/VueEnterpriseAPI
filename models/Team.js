const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  founded: {
    type: Number,
    required: true,
  },
  logo: {
    type: String,
  },
});

module.exports = Team = mongoose.model("Team", teamSchema);
