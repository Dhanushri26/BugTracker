const { Bug } = require("../models");

class BugService {
  static async createBug(data) {
    return await Bug.create(data);
  }

  static async getAllBugs() {
    return await Bug.findAll();
  }

  static async getBugById(id) {
    return await Bug.findByPk(id);
  }

  static async updateBug(id, data) {
    const bug = await Bug.findByPk(id);
    if (!bug) return null;
    return await bug.update(data);
  }

  static async deleteBug(id) {
    const bug = await Bug.findByPk(id);
    if (!bug) return null;
    await bug.destroy();
    return bug;
  }
}

module.exports = BugService;
