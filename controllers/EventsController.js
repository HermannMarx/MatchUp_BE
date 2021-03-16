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

    let dbExp = [];
    const date = new Date();
    const yr = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hrs = date.getHours();
    const mins = date.getMinutes();

    const expDate =
      yr + "-" + month + "-" + day + "T" + hrs + ":" + mins + ":00.000+00:00";

    dbFiltered.map((event, index) => {
      if (
        (event.organizer === id && event.feedback === false) ||
        event.endtime > expDate
      ) {
        dbExp.push(event);
      }
    });

    res.json(dbExp);
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

    let dbExp = [];
    const date = new Date();
    const yr = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hrs = ("0" + date.getHours()).slice(-2);
    const mins = ("0" + date.getMinutes()).slice(-2);

    const expDate =
      yr + "-" + month + "-" + day + "T" + hrs + ":" + mins + ":00.000+00:00";

    dbFiltered.map((invite, index) => {
      /*  console.log("Endtime: ", expDate); */
      if (invite.endtime > expDate) {
        dbExp.push(invite);
      }
      /*   console.log("This is type: ", typeof invite.endtime); */
    });

    res.json(dbExp);
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

    res.send("Players have been invited");
  },
  accept: async (req, res) => {
    const { id } = req.params;
    const { event_id } = req.body;

    const dbRes = await EVENT.updateOne(
      { _id: event_id, "players.player_id": id },
      {
        $set: { "players.$.answer": true, "players.$.accept": true },
      }
    );
    res.json(dbRes);
  },

  cancel: async (req, res) => {
    const { id } = req.params;
    const { event_id } = req.body;

    const dbRes = await EVENT.updateOne(
      { _id: event_id, "players.player_id": id },
      {
        $set: { "players.$.answer": true },
      }
    );
    res.json(dbRes);
  },
  createEvent: async (req, res) => {
    const {
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
      players: [
        {
          player_id: organizer,
          player_name: organizer_name,
          answer: true,
          accept: true,
          attend: false,
          winner: false,
        },
      ],
      league_id: league_id || null,
      information: information,
      feedback: false,
    });
    res.json(dbRes);
  },
  receiveFeedback: async (req, res) => {
    const { id } = req.body;
    console.log("THis is id from Feedback: ", id);
    await EVENT.updateOne(
      { _id: id },
      {
        $set: {
          feedback: true,
        },
      }
    );
    res.send("Feedback has been implemented!");
  },
};
