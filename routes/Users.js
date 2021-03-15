const userController = require("../controllers/UserController");

express = require("express");
router = express.Router();

router.get("/users/:id", userController.getUser);
router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);
router.put("/users", userController.updateUser);
router.put("/users/rmsport", userController.removeSport);
router.put("/users/addsport", userController.addSport);
router.post("/users/filter", userController.filterUsers);
router.post("/users/login", userController.login);

module.exports = router;
