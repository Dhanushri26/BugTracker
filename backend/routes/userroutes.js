const express = require("express");
const router = express.Router();
const UserController = require("../controllers/usercontoller");

router.post("/create", UserController.createUser);
router.post("/verify", UserController.verifyUser);
router.get("/all", UserController.getUsers);

module.exports = router;
