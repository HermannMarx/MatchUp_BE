//import mogoose.model
const { db } = require("../models/Event");
const EVENT = require("../models/Event");
const mongoose = require("mongoose");

module.exports = {
  getAllEvents: async (req, res) => {
    const dbRes = await EVENT.find({});
    res.json(dbRes);
  },
  getByUser: async (req, res) => {
    const { id } = req.params;
    const dbRes = await EVENT.find({
      "players.player_id": id,
      /* "players.accept": true, */
    });
    const dbLength = dbRes.length;

    let dbFiltered = [];

    for (let i = 0; i < dbLength; i++) {
      dbRes[i].players.map((player, index) => {
        if (player.player_id == id && player.accept === true)
          dbFiltered.push(dbRes[i]);
      });
    }

    /*   if ("2021-03-07T16:35:55.433+00:00" < "2021-03-07U16:35:55.433+00:00")
      console.log("First number is bigger!");
    else console.log("Second number is bigger"); */
    res.json(dbFiltered);
  },
  getPlayers: async (req, res) => {
    const { id } = req.params;

    const dbRes = await EVENT /* .find({
      "players.player_id": id,
      "players.accept": true,
    }) */.aggregate(
      [
        /*  { $match: { "players.player_id": id } }, */
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
      /* "players.answer": false, */
    });

    let dbFiltered = [];

    for (let i = 0; i < dbRes.length; i++) {
      dbRes[i].players.map((player, index) => {
        if (player.player_id == id && player.answer === false) {
          dbFiltered.push(dbRes[i]);
        }
      });
    }
    res.json(dbFiltered);
  },
  eventInvites: async (req, res) => {
    const { id, players } = req.body;
    console.log(players);
    console.log(id);
    num = players.length;

    for (let i = 0; i < num; i++) {
      dbRes = await EVENT.updateOne(
        { _id: id },
        {
          $push: {
            players: {
              player_id: players[i]._id,
              player_name: players[i].username,
              answer: false,
              accept: false,
              attend: false,
              winner: false,
            },
          },
        }
      );
    }

    //const arrayOfPlayers = players.split(",");
    //const num = arrayOfPlayers.length;

    //console.log("This is players: " + players);

    /*  for (let i = 0; i < num; i++) {
    } */

    res.send("Players have been invited");
  },
  createEvent: async (req, res) => {
    const {
      player_id,
      players,
      city,
      latLng,
      date,
      starttime,
      endtime,
      activity,
      organizer,
      organizer_name,
      league_id,
      information,
    } = req.body;

    const validStart = date.split("T")[0] + "T" + starttime + ":00.000+00:00";
    const validEnd = date.split("T")[0] + "T" + endtime + ":00.000+00:00";

    console.log("This is date: ", validStart);

    dbRes = await EVENT.create({
      location: {
        city: city || null,
        latLng: latLng || null,
      },
      date: date,
      starttime: validStart || null, //how works the Mongo DB data type for date? //must match one of the interests of the user who creates the match
      endtime: validEnd || null,
      activity: activity || null,
      organizer: organizer || null, // must refer to the _id of the user creating this event.
      organizer_name: organizer_name || null,
      players: [],
      /* {
          player_id: player_id,
          answer: true,
          accept: true,
          attend: true,
          winner: true,
        }, */
      league_id: league_id || null,
      information: information,
    });
    res.json(dbRes);
  },
};
