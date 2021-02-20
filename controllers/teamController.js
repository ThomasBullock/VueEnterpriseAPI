const Team = require("../models/Team");
const slugify = require("slugify");

exports.create = (req, res) => {
  const slug = slugify(req.body.name, {
    lower: true,
  });
  req.body.slug = slug;
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

exports.updateOne = (req, res) => {
  console.log("updateOne", req.params.id);
  console.log(req.body);
  const slug = slugify(req.body.name, {
    lower: true,
  });
  console.log(slug);
  req.body.slug = slug;
  Team.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new band instead of the old one
    runValidators: true,
  }).then((updatedTeam) => {
    console.log("updatedTEam", updatedTeam);
    res.status(200).json(updatedTeam);
  });
};

exports.getAll = (req, res) => {
  Team.find().then((teams) => {
    res.status(200).json(teams);
  });
};
