express = require("express");
router = express.Router();
eventsController = require("../controllers/EventsController");

router.get("/events", eventsController.getAllEvents);
router.get("/events/:id", eventsController.getByUser);
router.get("/events/:id/invites", eventsController.userInvites);
router.post("/events", eventsController.createEvent);

module.exports = router;
