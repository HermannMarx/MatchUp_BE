express = require("express");
router = express.Router();
eventsController = require("../controllers/EventsController");

router.get("/events", eventsController.getAllEvents);
router.get("/events/:id", eventsController.getByUser);
router.get("/events/:id/players", eventsController.getPlayers);
router.get("/events/:id/getinvites", eventsController.getInvites);
router.post("/events/:id/accept", eventsController.accept);
router.post("/events/:id/cancel", eventsController.cancel);
router.post("/events/invite", eventsController.eventInvites);

router.post("/events", eventsController.createEvent);

module.exports = router;
