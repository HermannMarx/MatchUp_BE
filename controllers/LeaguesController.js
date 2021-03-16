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
  insertAttend: async (req, res) => {
    const { activity, player_id } = req.body;

    console.log("This is activity: ", activity);

    dbRes = await LEAGUE.updateOne(
      {
        $and: [
          {
            activity: activity,
          },
          {
            "players.player_id": player_id,
          },
        ],
      },

      {
        $inc: {
          "players.$.attend": 1,
        },
      }
    );

    res.json(dbRes);
  },
  insertWin: async (req, res) => {
    const { activity, winners } = req.body;
    console.log("This is activity from winners: ", activity);
    console.log("This is winners from winners: ", winners);

    for (let i = 0; i < winners.length; i++) {
      dbRes = await LEAGUE.updateOne(
        {
          $and: [
            {
              activity: activity,
            },
            {
              "players.player_id": winners[i].player_id,
            },
          ],
        },

        {
          $inc: {
            "players.$.wins": 1,
          },
        }
      );
    }

    res.send("Hello Winners!");
  },
  createLeague: async (req, res) => {
    const { city, latLng, activity } = req.body;
    dbRes = await LEAGUE.create({
      location: {
        city: city || null,
        latLng: latLng || null,
      },
      activity: activity,
      players: [],
    });
    res.json(dbRes);
  },
  insertUser: async (req, res) => {
    const { activity, player_id, player_name } = req.body;

    const dbCheck = await LEAGUE.find({
      $and: [
        {
          activity: activity,
        },
        {
          "players.player_id": player_id,
        },
      ],
    });

    if (dbCheck.length === 0) {
      await LEAGUE.updateOne(
        { activity: activity },
        {
          $push: {
            players: {
              player_id: player_id,
              player_name: player_name,
              wins: 0,
              attend: 0,
            },
          },
        }
      );
    }

    res.json("Passed feedback successfully!");
  },
};
