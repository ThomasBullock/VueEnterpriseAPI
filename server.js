require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const auth = require("./routes/auth-routes");
const api = require("./routes/api-routes");
const scraper = require("./routes/scraper-routes");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config").db;

console.log(db);

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/auth", auth);
app.use("/api", api);
app.use("/scraper", scraper);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
