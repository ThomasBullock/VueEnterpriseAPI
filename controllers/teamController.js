const Team = require("../models/Team");

exports.create = (req, res) => {
  const newTeam = new Team({
    ...req.body,
  });

  newTeam
    .save()
    .then((team) =>
      res.json({
        team,
      })
    )
    .catch((err) => console.log(err));
};

exports.getAll = (req, res) => {
  Team.find().then((teams) => {
    res.status(200).json(teams);
  });
};
