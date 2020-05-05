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
  dob: {
    type: Date,
    required: "You must enter a date of birth!",
  },
  teamID: {
    type: mongoose.Schema.ObjectId,
    ref: "Team",
    required: "You must supply a teamID",
  },
});

module.exports = Player = mongoose.model("Player", playerSchema);
