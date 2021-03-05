//import mogoose.model
const { db } = require("../models/Event");
const EVENT = require("../models/Event");

module.exports = {
  getAllEvents: async (req, res) => {
    const dbRes = await EVENT.find({});
    res.json(dbRes);
  },
  getByUser: async (req, res) => {
    const { id } = req.params;
    const dbRes = await EVENT.find({
      "players.player_id": id,
      "players.accept": true,
    });
    console.log("This is dbRes :" + dbRes);
    res.json(dbRes);
  },
  getPlayers: async (req, res) => {
    const { id } = req.params;
    const dbRes = await EVENT /* .find({
      "players.player_id": id,
      "players.accept": true,
    }) */.aggregate(
      [
        { $match: { "players.player_id": id } },
        {
          $lookup: {
            from: "users",
            localField: "players.player_id",
            foreignField: "_id",
            as: "player_details",
          },
        },
      ]
    );

    /*    const ResData = dbRes.filter((event) =>
      event.players.includes(player_id[0] === id)
    );
    console.log("This is ResData: ", ResData); */

    /*   .populate({
      path: "players",
      populate: {
        path: "player_id",
        model: "User",
      },
    }); */

    /*   .populate("players.player_id")
      .exec(function (err, event) {
        if (err) return console.log(err);
        console.log("The players.name", event);
      }); */
    res.send(dbRes);
  },
  getInvites: async (req, res) => {
    const { id } = req.params;
    const dbRes = await EVENT.find({
      "players.player_id": id,
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
      player_id,
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
        {
          player_id: player_id,
          answer: true,
          accept: true,
          attend: true,
          winner: true,
        },
      ],
      league_id: league_id || null,
    });
    res.json(dbRes);
  },
};
