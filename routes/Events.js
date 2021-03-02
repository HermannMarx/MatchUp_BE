express = require("express");
router = express.Router();
eventsController = require("../controllers/EventsController");

router.get("/events", eventsController.getAllEvents);
router.get("/events/:id", eventsController.getByUser);
router.get("/events/:id/invitesbyuser", eventsController.getInvitesByUser);
router.post("/events/invite", eventsController.eventInvites);
router.post("/events", eventsController.createEvent);

module.exports = router;
