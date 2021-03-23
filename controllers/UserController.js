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
  filterUsers: async (req, res) => {
    const { latLng, activity } = req.body;

    dbUsers = await USER.find({
      $and: [
        { interests: activity },
        { "location.latLng.lng": { $gt: latLng.lng - 0.1 } },
        { "location.latLng.lng": { $lt: latLng.lng + 0.1 } },
        { "location.latLng.lat": { $gt: latLng.lat - 0.1 } },
        { "location.latLng.lat": { $lt: latLng.lat + 0.1 } },
      ],
    });

    res.send(dbUsers);
  },
  createUser: async (req, res) => {
    const { username, email, password, city, latLng, interests } = req.body;
    dbRes = await USER.create({
      username: username,
      avatar: "first.png",
      email: email,
      password: password,
      location: {
        city: city,
        latLng: {
          lat: latLng.lat,
          lng: latLng.lng,
        },
      },
      interests: interests,
    });
    res.json({
      code: 200,
      message: "Successfully created account!",
      data: dbRes,
    });
  },
  updateUser: async (req, res) => {
    const { id, username, email, password, city, latLng } = req.body;

    dbRes = await USER.updateOne(
      { _id: id },
      {
        $set: {
          username: username,
          email: email,
          password: password,
          "location.city": city,
          "location.latLng.lat": latLng.lat,
          "location.latLng.lng": latLng.lng,
        },
      }
    );
    res.json(dbRes);
  },
  removeSport: async (req, res) => {
    const { id, interests } = req.body;
    dbRes = await USER.updateOne(
      { _id: id },
      {
        $set: {
          interests: interests,
        },
      }
    );
    res.json(dbRes);
  },
  addSport: async (req, res) => {
    const { id, interests } = req.body;
    dbRes = await USER.updateOne(
      { _id: id },
      {
        $set: {
          interests: interests,
        },
      }
    );
    res.json(dbRes);
  },
  login: async (req, res) => {
    const { username, password } = req.body;

    dbUsername = await USER.find({ username: username });
    if (dbUsername[0].password === password) {
      req.session.isConnected = true;
      res.json({
        code: 200,
        _id: dbUsername[0]._id,
      });
    } else {
      res.sendStatus(401);
    }
  },
  logout: async (req, res) => {
    //console.log("This is destroy", req.session);
    req.session.destroy(function (err) {
      //console.log("You are logged out");
      res.send("You are logged out");
    });
  },
};
