const { User } = require("../models");

class UserService {
  static async createUser(data) {
    return await User.create(data);
  }

  static async getUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async verifyUser(email) {
    return await User.update(
      { isVerified: true },
      { where: { email } }
    );
  }

  static async getAllUsers() {
    return await User.findAll();
  }
}

module.exports = UserService;
