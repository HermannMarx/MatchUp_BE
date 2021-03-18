express = require("express");
router = express.Router();
leaguesController = require("../controllers/LeaguesController");

const verify = (req, res, next) => {
  if (req.session.isConnected === true) {
    console.log("THis is req.session from verify: ", req.session);
    next();
  } else {
    res.sendStatus(401);
  }
};

router.get("/leagues/:id", leaguesController.getLeaguesById);
router.get("/leagues", leaguesController.getAllLeagues);
router.post("/leagues", leaguesController.createLeague);
router.post("/leagues/insertuser", leaguesController.insertUser);
router.put("/leagues/attend", leaguesController.insertAttend);
router.put("/leagues/win", leaguesController.insertWin);

module.exports = router;
