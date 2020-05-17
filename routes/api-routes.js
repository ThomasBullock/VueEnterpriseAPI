const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController");
const playerController = require("../controllers/playerController");
const Team = require("../models/Team");

// // @route POST api/users/register
// // @desc Register user
// // @access Public
// router.post("/register", authController.register);

// // @route POST api/users/login
// // @desc Login user and return JWT token
// // @access Public
// router.post("/login", authController.login);

// // auth with google+ (when we say google it knows we are referring to the GoogleStrategy we added to passport in passport-setup.js)
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile"],
//   })
// );

// // callback route for google - this time we have a code so we aren't sent to th consent screen as we are on /google
// router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
//   console.log(req.query);
//   res.send("you reached callback");
// });

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
router.post("/players", authController.isAuthorized, playerController.create);
router.get("/players", authController.isAuthorized, playerController.getAll);
router.put(
  "/players/:id",
  authController.isAuthorized,
  playerController.updateOne
);
router.delete(
  "/players/:id",
  authController.isAuthorized,
  playerController.delete
);

module.exports = router;
