const UserService = require("../services/userservice");

class UserController {
  static async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      const existing = await UserService.getUserByEmail(email);
      if (existing) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await UserService.createUser({
        name,
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async verifyUser(req, res) {
    try {
      const { email } = req.body;

      await UserService.verifyUser(email);

      return res.json({ message: "User verified successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
