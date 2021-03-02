//import mogoose.model
const { db } = require("../models/Event");
const EVENT = require("../models/Event");

module.exports = {
  getAllEvents: async (req, res) => {
    const dbRes = await EVENT.find({});
    res.json(dbRes);
  },
  getByUser: async (req, res) => {
    const { player_id } = req.body;
    const dbRes = await EVENT.find({
      "players.player_id": player_id,
      "players.accept": true,
    });
    res.json(dbRes);
  },
  getInvitesByUser: async (req, res) => {
    const { player_id } = req.body;
    const dbRes = await EVENT.find({
      "players.player_id": player_id,
      "players.answer": false,
    });
    res.json(dbRes);
  },
  eventInvites: async (req, res) => {
    const { id, players } = req.body;
    const arrayOfPlayers = players.split(",");
    const num = arrayOfPlayers.length;

    console.log("This is players: " + players);

    for (let i = 0; i < num; i++) {
      await EVENT.updateOne(
        { _id: id },
        {
          $push: {
            players: {
              player_id: arrayOfPlayers[i],
              answer: false,
              accept: false,
              attend: false,
              winner: false,
            },
          },
        }
      );
    }

    res.send("Players have been invited");
  },
  createEvent: async (req, res) => {
    const {
      city,
      lat,
      lng,
      starttime,
      endtime,
      activity,
      organizer,
      league_id,
    } = req.body;
    dbRes = await EVENT.create({
      location: {
        city: city || null,
        lat: lat || null,
        lng: lng || null,
      },
      starttime: starttime || null, //how works the Mongo DB data type for date?
      endtime: endtime || null,
      activity: activity || null, //must match one of the interests of the user who creates the match
      organizer: organizer || null, // must refer to the _id of the user creating this event.
      players: [
        /*  {
          player_id: "603cfed4da1afb490c97bdf5",
          answer: true,
          accept: true,
          attend: true,
          winner: true,
        }, */
      ],
      league_id: league_id || null,
    });
    res.json(dbRes);
  },
};
