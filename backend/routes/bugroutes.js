const express = require("express");
const router = express.Router();
const BugController = require("../controllers/bugcontroller");

router.post("/", BugController.createBug);
router.get("/", BugController.getAllBugs);
router.get("/:id", BugController.getBugById);
router.put("/:id", BugController.updateBug);
router.delete("/:id", BugController.deleteBug);

module.exports = router;
