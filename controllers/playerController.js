const Player = require("../models/Player");

exports.create = (req, res) => {
  const newPlayer = new Player({
    ...req.body,
  });

  newPlayer
    .save()
    .then((player) =>
      res.json({
        player,
      })
    )
    .catch((err) => console.log(err));
};
