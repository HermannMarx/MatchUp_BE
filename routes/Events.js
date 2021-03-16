express = require("express");
router = express.Router();
eventsController = require("../controllers/EventsController");

const verify = (req, res, next) => {
  console.log("THis is req.session FROM EVENTS: ", req.session);
  if (req.session.isConnected === true) {
    console.log("I am in");
    next();
  } else {
    res.sendStatus(401);
  }
};

router.get("/events", eventsController.getAllEvents);
router.post("/events/invite", verify, eventsController.eventInvites);
router.post("/events/:id/accept", verify, eventsController.accept);
router.post("/events/:id/cancel", verify, eventsController.cancel);
router.post("/events", verify, eventsController.createEvent);
router.get("/events/:id", verify, eventsController.getByUser);
router.get("/events/:id/getinvites", verify, eventsController.getInvites);


module.exports = router;
