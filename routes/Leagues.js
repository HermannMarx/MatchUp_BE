express = require("express");
router = express.Router();
leaguesController = require("../controllers/LeaguesController");

router.get("/leagues/:id", leaguesController.getLeaguesById);
router.get("/leagues", leaguesController.getAllLeagues);
router.post("/leagues", leaguesController.createLeague);
router.post("/leagues/insertuser", leaguesController.insertUser);
router.put("/leagues/attend", leaguesController.insertAttend);
router.put("/leagues/win", leaguesController.insertWin);

module.exports = router;
