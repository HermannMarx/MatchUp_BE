const userController = require("../controllers/userController");

express = require("express");
router = express.Router();

router.get("/users/:id", userController.getUser);
router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);
router.post("/users/login", userController.login);

module.exports = router;
