const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

exports.login = (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          secret,
          {
            expiresIn: 86400, // 1 day in seconds
          },
          (err, token) => {
            console.log("Successful Login");
            res.json({
              id: user._id,
              name: user.name,
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};

exports.register = (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) =>
              res.json({
                name: user.name,
                success: true,
              })
            )
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

exports.isAuthorized = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const data = jwt.verify(token, secret);
    User.findOne({ _id: data.id })
      .then((user) => {
        if (!user) {
          throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
      })
      .catch((err) => {
        console.log(err);
        res
          .status(401)
          .send({ error: "Not authorized to access this resource" });
      });
  } catch (err) {
    // err
    console.log(">>> err");
    console.log(err);
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
