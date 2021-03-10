const { db } = require("../models/League");
const LEAGUE = require("../models/League");

module.exports = {
  getAllLeagues: async (req, res) => {
    const dbRes = await LEAGUE.find({});
    res.json(dbRes);
  },
  getLeaguesById: async (req, res) => {
    const { id } = req.params;
    const dbRes = await LEAGUE.find({
      "players.player_id": id,
    });
    res.json(dbRes);
  },
  insertResults: (req, res) => {
    res.send("Inserted Results");
  },
  createLeague: async (req, res) => {
    const { city, lat, lng, activity } = req.body;
    dbRes = await LEAGUE.create({
      location: {
        city: city,
        lat: lat,
        lng: lng,
      },
      activity: activity,
      players: [],
    });
    res.json(dbRes);
  },
  insertUser: async (req, res) => {
    const { id, player_id } = req.body;
    dbRes = await LEAGUE.updateOne(
      { _id: id },
      {
        $push: {
          players: {
            player_id: player_id,
            wins: 0,
            attend: 0,
          },
        },
      }
    );
    res.json(dbRes);
  },
};
