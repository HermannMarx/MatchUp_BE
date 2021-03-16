const userController = require("../controllers/UserController");

express = require("express");
router = express.Router();

const verify = (req, res, next) => {
  if (req.session.isConnected === true) {
    console.log("THis is req.session from verify: ", req.session);
    next();
  } else {
    res.sendStatus(401);
  }
};

const test = (req, res) => {
  console.log("This is test");
  res.send("This is test");
};

const destroy = (req, res) => {
  console.log("This is destroy");
  req.session.destroy(function (err) {
    res.send("Logout");
    console.log("After logout: " + req.session);
  });
};

router.get("/users/test", verify, test);
router.get("/users/destroy", verify, destroy);
router.get("/users", verify, userController.getAllUsers);
router.post("/users", userController.createUser);
router.put("/users", verify, userController.updateUser);
router.put("/users/rmsport", verify, userController.removeSport);
router.put("/users/addsport", verify, userController.addSport);
router.post("/users/filter", verify, userController.filterUsers);
router.post("/users/login", userController.login);
router.get("/users/logout", userController.logout);
router.get("/users/:id", verify, userController.getUser);

module.exports = router;
