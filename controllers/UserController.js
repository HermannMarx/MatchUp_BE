//import mogoose.model

module.exports = {
  getAllUsers: (req, res) => {
    res.send("Hello UserController");
  },
  getUserById: (req, res) => {
    res.send("Hello UserById");
  },
  createUser: (req, res) => {
    res.send("Create a user");
  },
};
