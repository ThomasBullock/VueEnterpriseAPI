const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", authController.register);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", authController.login);

// auth with google+ (when we say google it knows we are referring to the GoogleStrategy we added to passport in passport-setup.js)
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback route for google - this time we have a code so we aren't sent to th consent screen as we are on /google
router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    console.log(req);

    const payload = {
      id: req.user._id,
      name: req.user.name,
    };

    jwt.sign(
      payload,
      secret,
      {
        expiresIn: 86400, // 1 day in seconds
      },
      (err, token) => {
        console.log("jwt sign token : " + token);
        res.redirect("http://localhost:9090/#/auth/google?token=" + token);
      }
    );
  }
);

module.exports = router;
