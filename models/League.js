const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
  location: {
    city: String,
    latLng: {
      lat: Number,
      lng: Number,
    },
  },
  activity: String,
  players: [
    {
      player_id: { type: Schema.Types.ObjectId, ref: "User" },
      player_name: String,
      wins: Number,
      attend: Number,
    },
  ],
});

module.exports = mongoose.model("LEAGUE", leagueSchema);
