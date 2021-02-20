const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: "Please enter a player number!",
  },
  name: {
    type: String,
    trim: true,
    required: "Please enter a player first name!",
  },
  surname: {
    type: String,
    trim: true,
    required: "Please enter a player surname!",
  },
  height: {
    type: Number,
    // required: 'Please enter a player height'
  },
  weight: {
    type: Number,
  },
  games: {
    type: Number,
    // required: 'Please enter a player number!'
  },
  goals: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Available", "Injured", "Suspended", "Retired"],
    required: "You must supply a status.",
  },
  position: {
    type: String,
    enum: ["Forward", "Midfield", "Defender", "Ruck", "Utility"],
    required: "You must supply a position.",
  },
  dob: {
    type: Date,
    required: "You must enter a date of birth!",
  },
  teamId: {
    type: mongoose.Schema.ObjectId,
    ref: "Team",
    required: "You must supply a teamID",
  },
  imgUrl: {
    type: String,
  },
  imgPublicId: {
    type: String,
  },
});

module.exports = Player = mongoose.model("Player", playerSchema);
