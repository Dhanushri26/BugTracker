const express = require("express");
const router = express.Router();
const UserController = require("../controllers/usercontoller");

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/verify", UserController.verifyUser);
router.get("/all", UserController.getUsers);
router.get("/team/:team", UserController.getUsersByTeam);
router.get("/:email", UserController.getUserByEmail);
router.put("/:email/team", UserController.updateUserTeam);

module.exports = router;
