express = require("express");
router = express.Router();
leaguesController = require("../controllers/LeaguesController");

const verify = (req, res, next) => {
  console.log("THis is req.session FROM EVENTS: ", req.session);
  if (req.session.isConnected === true) {
    console.log("I am in");
    next();
  } else {
    res.sendStatus(401);
  }
};

router.get("/leagues/:id", verify, leaguesController.getLeaguesById);
router.get("/leagues", leaguesController.getAllLeagues);
router.post("/leagues", verify, leaguesController.createLeague);
router.post("/leagues/insertuser", verify, leaguesController.insertUser);
router.post("/leagues/results", verify, leaguesController.insertResults);

module.exports = router;
