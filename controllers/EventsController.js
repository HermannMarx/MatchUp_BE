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
