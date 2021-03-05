const mongoose = require("mongoose");
const USER = require("./User");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  location: {
    city: String,
    lat: String,
    lng: String,
  },
  starttime: { type: Date, default: Date.now }, //how works the Mongo DB data type for date?
  endtime: { type: Date, default: Date.now },
  activity: String, //must match one of the interests of the user who creates the match
  organizer: String, // must refer to the _id of the user creating this event.
  players: [
    {
      player_id: { type: Schema.Types.ObjectId, ref: "User" },
      answer: Boolean,
      accept: Boolean,
      attend: Boolean,
      winner: Boolean,
    },
  ],
  league_id: [{ type: Schema.Types.ObjectId, ref: "League" }],
});

module.exports = mongoose.model("EVENT", eventSchema);
