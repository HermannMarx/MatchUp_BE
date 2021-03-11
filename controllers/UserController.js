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
    const { username, email, password, city, latLng, interests } = req.body;
    dbRes = await USER.create({
      username: username,
      avatar: "first.png",
      email: email,
      password: password,
      location: {
        city: city,
        latLng: latLng,
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
