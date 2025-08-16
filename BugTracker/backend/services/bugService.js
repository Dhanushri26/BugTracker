// services/bugService.js
const { Bug } = require("../models");

class BugService {
  async createBug(data) {
    return await Bug.create(data);
  }

  async getAllBugs() {
    return await Bug.findAll();
  }

  async getBugById(id) {
    return await Bug.findByPk(id);
  }

  async updateBug(id, data) {
    const bug = await Bug.findByPk(id);
    if (!bug) return null;
    await bug.update(data);
    return bug;
  }

  async deleteBug(id) {
    const bug = await Bug.findByPk(id);
    if (!bug) return null;
    await bug.destroy();
    return bug;
  }
}

module.exports = new BugService();
