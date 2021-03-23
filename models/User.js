const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  avatar: String,
  email: String,
  password: String,
  location: {
    city: String,
    latLng: {
      lat: Number,
      lng: Number,
    },
  },
  interests: Array,
});

module.exports = mongoose.model("USER", userSchema);
