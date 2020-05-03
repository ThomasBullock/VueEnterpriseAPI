const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController");
const playerController = require("../controllers/playerController");
const Team = require("../models/Team");
// const auth = require("../middleware/auth");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", authController.register);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", authController.login);

//
router.get("/dashboard", authController.isAuthorized, (req, res) => {
  Team.find().then((teams) => {
    res.status(200).json({
      user: req.user,
      teams: teams,
    });
  });
});

// Teams routes
router.post("/teams", authController.isAuthorized, teamController.create);
router.get("/teams", authController.isAuthorized, teamController.getAll);

// Player routes
router.post("players", authController.isAuthorized, playerController.create);

module.exports = router;
