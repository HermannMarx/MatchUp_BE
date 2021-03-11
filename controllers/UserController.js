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
    console.log("This is latLng:", latLng.lat);
    console.log("This is minus:", latLng.lat - 0.05);
    console.log("This is activity:", activity);

    dbUsers = await USER.find({
      $and: [
        { interests: activity },
        { "location.latLng.lng": { $gt: latLng.lng - 0.1 } },
        { "location.latLng.lng": { $lt: latLng.lng + 0.1 } },
        { "location.latLng.lat": { $gt: latLng.lat - 0.1 } },
        { "location.latLng.lat": { $lt: latLng.lat + 0.1 } },
      ],
    });

    /*    interests: activity,
                   "location.latLng.lat": { $gt: latLng.lat - 0.05 },
       "location.latLng.lat": { $lt: latLng.lat + 0.05 },
       "location.latLng.lng": { $gt: latLng.lng - 0.05 },
       "location.latLng.lng": { $lt: latLng.lng + 0.05 }, */
    //  db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
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
        }, //latLng,
      },
      interests: interests,
    });
    res.json({
      code: 200,
      message: "Successfully created account!",
      data: dbRes,
    });
  },
  login: async (req, res) => {
    const { username, password } = req.body;

    dbUsername = await USER.find({ username: username });
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
