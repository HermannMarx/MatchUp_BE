//import mogoose.model
const USER = require("../models/User");
const { userInvites } = require("./EventsController");

module.exports = {
  getAllUsers: async (req, res) => {
    dbRes = await POST.find({});
    res.json(dbRes);
  },
  getUserById: (req, res) => {
    res.send("Hello UserById");
  },
  createUser: async (req, res) => {
    const {
      username,
      email,
      password,
      city,
      lat,
      lng,
      football,
      basketball,
      volleyball,
      beachvolleyball,
      tennis,
      icehockey,
      handball,
      pingpong,
      badminton,
      americanfootball,
      rubgy,
      kubb,
      boules,
    } = req.body;
    dbRes = await USER.create({
      username: username,
      avatar: "first.png",
      email: email,
      password: password,
      location: {
        city: city,
        lat: lat,
        lng: lng,
      },
      interests: {
        football: football || null,
        basketball: basketball || null,
        volleyball: volleyball || null,
        beachvolleyball: beachvolleyball || null,
        tennis: tennis || null,
        icehockey: icehockey || null,
        handball: handball || null,
        pingpong: pingpong || null,
        badminton: badminton || null,
        americanfootball: americanfootball || null,
        rubgy: rubgy || null,
        kubb: kubb || null,
        boules: boules || null,
      },
      events: [],
    });
    res.json(dbRes);
  },
};
