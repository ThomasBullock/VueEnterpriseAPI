const Player = require("../models/Player");

exports.create = (req, res) => {
  console.log(req.body);
  const newPlayer = new Player({
    ...req.body,
  });

  newPlayer
    .save()
    .then((player) => {
      console.log(player);
      res.json({
        player,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAll = (req, res) => {
  Player.find().then((players) => {
    res.status(200).json(players);
  });
};

exports.updateOne = (req, res) => {
  console.log(req.body);
  console.log(req.params);
  Player.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new band instead of the old one
    runValidators: true,
  }).then((updatePlayer) => {
    console.log(updatePlayer);
    res.status(200).json(updatePlayer);
  });
};

exports.delete = (req, res) => {
  Player.findOneAndDelete({ _id: req.params.id }).then((deletedPlayer) => {
    console.log(deletedPlayer);
    if (deletedPlayer) {
      // this clause wont eventuate if we dont call .send() !!
      res.status(204).send();
    }
  });
};
