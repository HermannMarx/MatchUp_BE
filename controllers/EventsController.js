//import mogoose.model
const EVENT = require("../models/Event");

module.exports = {
  getAllEvents: (req, res) => {
    res.send("Hello EventsController");
  },
  getByUser: (req, res) => {
    res.send("EventsbyUser");
  },
  userInvites: (req, res) => {
    res.send("INvites");
  },
  createEvent: async (req, res) => {
    dbRes = await EVENT.create({
      location: {
        city: "Cologne",
        lat: "1234",
        lng: "5678",
      },
      starttime: "2002-12-09", //how works the Mongo DB data type for date?
      endtime: "2002-12-09",
      activity: "basketball", //must match one of the interests of the user who creates the match
      organizer: "UserReference", // must refer to the _id of the user creating this event.
      players: [
        {
          player_id: "603cfed4da1afb490c97bdf5",
          answer: true,
          accept: true,
          attend: true,
          winner: true,
        },
      ],
      league_id: "league_id",
    });
    res.json(dbRes);
  },
};
