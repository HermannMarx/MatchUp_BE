//import mogoose.model
const { getMaxListeners } = require("../models/User");
const USER = require("../models/User");

module.exports = {
  getAllUsers: async (req, res) => {
    dbRes = await POST.find({});
    res.json(dbRes);
  },
  getUserById: (req, res) => {
    res.send("Hello UserById");
  },
  createUser: async (req, res) => {
    dbRes = await USER.create({
      username: "Hermann",
      avatar: "first.png",
      email: "hermann@user.de",
      password: "1234",
      location: {
        city: "Cologne",
        lat: "1234",
        lng: "5678",
      },
      interests: {
        football: true,
        basketball: true,
        volleyball: true,
        beachvolleyball: true,
        tennis: false,
        icehockey: false,
        handball: false,
        pingpong: false,
        badminton: false,
        americanfootball: true,
        rubgy: true,
        kubb: true,
        boules: false,
      },
      events: [
        {
          event_id: "event1",
          status: "accept",
        },
      ],
    });
    res.json(dbRes);
  },
};
