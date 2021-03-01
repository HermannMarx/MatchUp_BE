//import mogoose.model

module.exports = {
  getAllEvents: (req, res) => {
    res.send("Hello EventsController");
  },
  getByUser: (req, res) => {
    res.send("EventsbyUser");
  },
  userInvites: (req, res) => {
    res.send("INvites");
  },
  createEvent: (req, res) => {
    res.send("Created event");
  },
};
