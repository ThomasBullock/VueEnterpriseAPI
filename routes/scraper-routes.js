const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const playerController = require("../controllers/playerController");
const rp = require("request-promise");
const $ = require("cheerio");
const baseUrl = "https://www.footywire.com/afl/footy/"; //"https://www.saints.com.au/";

const columns = [
  "number",
  "name",
  "games",
  "age",
  "dob",
  "height",
  "weight",
  "origin",
  "position",
];

router.get(
  "/scrape-footywire/:team",
  authController.isAuthorized,
  (req, res, next) => {
    console.log("/scrape-footywire/" + req.params.team);
    // res.send('GET')
    console.log(req.body);
    const teamId = req.query.team_id;
    rp(baseUrl + req.params.team).then(function (html) {
      const data = Array.from($("td.data", "div.datadiv", html));
      const numberCols = $("td:first-child.data", "div.datadiv", html);

      // console.log(numberCols);

      const rows = [];
      for (let i = 0; i < data.length - 1; i++) {
        // why we doing this see numberCols = should this be a proper array??
        if (numberCols[i]) {
          const number = numberCols[i].firstChild.data;
          const index = data.findIndex(
            (item) => item.firstChild.data === number
          );
          rows.push(index);
        }
      }

      const playersData = [];

      rows.forEach((i) => {
        const player = {};
        for (let j = 0; j < columns.length; j++) {
          //   console.log(columns[j]);
          if (j === 1) {
            if (data[i + j].firstChild.firstChild) {
              player[columns[j]] = data[i + j].firstChild.firstChild.data;
            }
          } else {
            player[columns[j]] = data[i + j].firstChild.data;
          }
        }

        playersData.push(player);
      });

      const players = playersData
        .filter((player) => player.name)
        .map((player) => {
          return {
            name: player.name.split(",")[1].trim(),
            surname: player.name.split(",")[0],
            dob: new Date(player.dob),
            games: player.games,
            number: player.number,
            height: player.height.split("c")[0],
            weight: player.weight.split("k")[0],
            position: player.position.trim(),
            teamId: teamId,
            status: "Available",
          };
        });
      req.body = { players };
      // res.status(200).json({
      //   players,
      // });
      next();
    });
  },
  playerController.create
);

module.exports = router;

//   return https.get("https://www.saints.com.au/teams/mens", (resp) => {
//     let data = "";

//     // A chunk of data has been received.
//     resp.on("data", (chunk) => {
//       data += chunk;

//       console.log(data);

//       return res.send("success");
//     });
//     // // A chunk of data has been received.
//     // resp.on('data', (chunk) => {
//     //   data += chunk;
//     // });

//     // // The whole response has been received. Print out the result.
//     // resp.on('end', () => {
//     //   console.log(JSON.parse(data).explanation);
//     // });
//   });
