const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  /* _id: Schema.Types.ObjectId, */
  username: String,
  avatar: String,
  email: String,
  password: String,
  location: {
    city: String,
    latLng: Object,
  },
  interests: Array,

  /*  {
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
  }, */
  /*   events: [
    {
      event_id: [{ type: Schema.Types.ObjectId, ref: "Event" }],
      status: String,
    },
  ], */
});

module.exports = mongoose.model("USER", userSchema);
