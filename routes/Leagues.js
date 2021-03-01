express = require("express");
router = express.Router();
leaguesController = require("../controllers/LeaguesController");

router.get("/leagues/:id", leaguesController.getLeaguesById);
router.get("/leagues", leaguesController.getAllLeagues);
router.post("/leagues", leaguesController.createLeague);
router.post("/leagues/results", leaguesController.insertResults);

module.exports = router;
