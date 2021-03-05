//import mogoose.model
const USER = require("../models/User");

module.exports = {
  getAllUsers: async (req, res) => {
    dbRes = await USER.find({});
    res.json(dbRes);
  },
  getUser: async (req, res) => {
    const { id } = req.params;

    dbRes = await USER.find({ _id: id });
    res.json(dbRes);
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
      /*  events: [], */
    });
    res.json(dbRes);
  },
  login: async (req, res) => {
    const { username, password } = req.body;

    dbUsername = await USER.find({ username: username });
    console.log(dbUsername[0].password);
    if (dbUsername[0].password === password) {
      res.json({
        code: 200,
        _id: dbUsername[0]._id,
      });
    } else {
      res.sendStatus(401);
    }
  },
};
