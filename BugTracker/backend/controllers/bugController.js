// controllers/bugController.js
const bugService = require("../services/bugService");

class BugController {
  async createBug(req, res) {
    try {
      const bug = await bugService.createBug(req.body);
      res.status(201).json(bug);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllBugs(req, res) {
    try {
      const bugs = await bugService.getAllBugs();
      res.json(bugs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBugById(req, res) {
    try {
      const bug = await bugService.getBugById(req.params.id);
      if (!bug) return res.status(404).json({ error: "Bug not found" });
      res.json(bug);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateBug(req, res) {
    try {
      const bug = await bugService.updateBug(req.params.id, req.body);
      if (!bug) return res.status(404).json({ error: "Bug not found" });
      res.json(bug);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteBug(req, res) {
    try {
      const bug = await bugService.deleteBug(req.params.id);
      if (!bug) return res.status(404).json({ error: "Bug not found" });
      res.json({ message: "Bug deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BugController();
