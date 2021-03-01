//import mogoose.model
const LEAGUE = require("../models/League");

module.exports = {
  getAllLeagues: (req, res) => {
    res.send("Hello LeagueController");
  },
  getLeaguesById: (req, res) => {
    res.send("Leagues by id");
  },
  insertResults: (req, res) => {
    res.send("Inserted Results");
  },
  createLeague: async (req, res) => {
    dbRes = await LEAGUE.create({
      location: {
        city: "Cologne",
        lat: "1234",
        lng: "5678",
      }, //google.maps validation
      activity: "basketball",
      players: [
        {
          player_id: "603cfed4da1afb490c97bdf5",
          wins: 5,
          attend: 6,
        },
      ],
    });
    res.json(dbRes);
  },
};
