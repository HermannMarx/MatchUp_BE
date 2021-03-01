const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  avatar: String,
  email: String,
  password: String,
  location: {
    city: String,
    lat: String,
    lng: String,
  },
  interests: {
    football: Boolean,
    basketball: Boolean,
    volleyball: Boolean,
    beachvolleyball: Boolean,
    tennis: Boolean,
    icehockey: Boolean,
    handball: Boolean,
    pingpong: Boolean,
    badminton: Boolean,
    americanfootball: Boolean,
    rubgy: Boolean,
    kubb: Boolean,
    boules: Boolean,
  },
  events: [
    {
      event_id: String,
      status: String,
    },
  ],
});

module.exports = mongoose.model("USER", userSchema);
