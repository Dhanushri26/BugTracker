const BugService = require("../services/bugservice");

class BugController {
  static async createBug(req, res) {
    try {
      const bug = await BugService.createBug(req.body);
      res.status(201).json(bug);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllBugs(req, res) {
    try {
      const bugs = await BugService.getAllBugs();
      res.json(bugs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBugById(req, res) {
    try {
      const bug = await BugService.getBugById(req.params.id);
      if (!bug) return res.status(404).json({ message: "Bug not found" });
      res.json(bug);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateBug(req, res) {
    try {
      const bug = await BugService.updateBug(req.params.id, req.body);
      if (!bug) return res.status(404).json({ message: "Bug not found" });
      res.json(bug);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteBug(req, res) {
    try {
      const bug = await BugService.deleteBug(req.params.id);
      if (!bug) return res.status(404).json({ message: "Bug not found" });
      res.json({ message: "Bug deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BugController;
