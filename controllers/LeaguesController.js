//import mogoose.model

module.exports = {
  getAllLeagues: (req, res) => {
    res.send("Hello LeagueController");
  },
  getLeaguesById: (req, res) => {
    res.send("Leagues by id");
  },
  insertResults: (req, res) => {
    res.send("Inserted Results");
  },
  createLeague: (req, res) => {
    res.send("Created League");
  },
};
