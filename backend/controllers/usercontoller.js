const UserService = require("../services/userservice");

class UserController {
  static async signup(req, res) {
    try {
      const { name, email, password, team } = req.body;

      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
      }

      const existing = await UserService.getUserByEmail(email);
      if (existing) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await UserService.createUser({
        name,
        email,
        password,
        team: team || 'Default'
      });

      return res.status(201).json({
        message: "User created successfully",
        user
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const result = await UserService.authenticateUser(email, password);
      
      return res.json({
        message: "Login successful",
        token: result.token,
        user: result.user
      });
    } catch (err) {
      return res.status(401).json({ error: err.message });
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

  static async getUserByEmail(req, res) {
    try {
      const { email } = req.params;
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Don't return password
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        team: user.team,
        isVerified: user.isVerified
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getUsersByTeam(req, res) {
    try {
      const { team } = req.params;
      const users = await UserService.getUsersByTeam(team);
      return res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateUserTeam(req, res) {
    try {
      const { email } = req.params;
      const { team } = req.body;

      if (!team) {
        return res.status(400).json({ message: "Team is required" });
      }

      await UserService.updateUserTeam(email, team);
      const user = await UserService.getUserByEmail(email);
      
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        team: user.team,
        isVerified: user.isVerified
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
