//import mogoose.model
const LEAGUE = require("../models/League");

module.exports = {
  getAllLeagues: async (req, res) => {
    const dbRes = await LEAGUE.find({});
    res.json(dbRes);
  },
  getLeaguesById: (req, res) => {
    res.send("Leagues by id");
  },
  insertResults: (req, res) => {
    res.send("Inserted Results");
  },
  createLeague: async (req, res) => {
    const { city, lat, lng, activity } = req.body;
    dbRes = await LEAGUE.create({
      location: {
        city: city || null,
        lat: lat || null,
        lng: lng || null,
      }, //google.maps validation
      activity: activity || null,
      players: [],
    });
    res.json(dbRes);
  },
};
