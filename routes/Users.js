const userController = require("../controllers/userController");

express = require("express");
router = express.Router();

const verify = (req, res, next) => {
  if (req.session.isConnected === true) {
    console.log("THis is req.session from verify: ", req.session);
    next();
  } /* else {
    res.sendStatus(401);
  } */
};

router.get("/users/:id", /* verify,  */ userController.getUser);
router.get("/users", /* verify, */ userController.getAllUsers);
router.post("/users", userController.createUser);
router.put("/users", /* verify,  */ userController.updateUser);
router.put("/users/rmsport", /* verify,  */ userController.removeSport);
router.put("/users/addsport", /* verify, */ userController.addSport);
router.post("/users/filter", /* verify, */ userController.filterUsers);
router.post("/users/login", userController.login);
router.get("/users/logout", /* verify, */ userController.logout);

module.exports = router;
