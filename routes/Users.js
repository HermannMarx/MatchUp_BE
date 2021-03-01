express = require("express");
router = express.Router();
userController = require("../controllers/UserController");

router.get("/users/:id", userController.getUserById);
router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);

module.exports = router;
