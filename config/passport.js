const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const secret = require("../config").secret;
const google = require("../config").google;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        callbackURL: "/auth/google/redirect",
        clientID: google.clientID,
        clientSecret: google.clientSecret,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("passport callback fired!");
        console.log(profile);
        User.findOne({ googleId: profile.id }).then((currentUser) => {
          if (currentUser) {
            // already have this user
            console.log("user is: ", currentUser);
            // do something
            done(null, currentUser);
          } else {
            // if not, create user in our db
            new User({
              googleId: profile.id,
              name: profile.displayName,
              avatar: profile._json.picture,
            })
              .save()
              .then((newUser) => {
                console.log("created new user: ", newUser);
                // do something
                done(null, newUser);
              });
          }
        });
      }
    )
  );
};
