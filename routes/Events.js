express = require("express");
router = express.Router();
eventsController = require("../controllers/EventsController");

const verify = (req, res, next) => {
  if (req.session.isConnected === true) {
    console.log("THis is req.session from verify: ", req.session);
    next();
  } else {
    res.sendStatus(401);
  }
};

router.get("/events", eventsController.getAllEvents);
router.post("/events/invite", eventsController.eventInvites);
router.put("/events/feedback", eventsController.receiveFeedback);
router.post("/events/:id/accept", eventsController.accept);
router.post("/events/:id/cancel", eventsController.cancel);
router.post("/events", eventsController.createEvent);
router.get("/events/:id", eventsController.getByUser);
router.get("/events/:id/getinvites", eventsController.getInvites);

module.exports = router;
