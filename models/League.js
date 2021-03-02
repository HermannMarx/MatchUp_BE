const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
  location: {
    city: String,
    lat: String,
    lng: String,
  }, //google.maps validation
  activity: String,
  players: [
    {
      player_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
      wins: Number,
      attend: Number,
    },
  ],
});

module.exports = mongoose.model("LEAGUE", leagueSchema);
