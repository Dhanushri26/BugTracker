const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";
const JWT_EXPIRY = "7d";

class UserService {
  static async createUser(data) {
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);
      
      const user = await User.create({
        ...data,
        password: hashedPassword
      });

      // Return user without password
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        team: user.team,
        isVerified: user.isVerified
      };
    } catch (error) {
      throw error;
    }
  }

  static async authenticateUser(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, team: user.team, name: user.name },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
      );

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          team: user.team,
          isVerified: user.isVerified
        }
      };
    } catch (error) {
      throw error;
    }
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
    return await User.findAll({
      attributes: { exclude: ['password'] }
    });
  }

  static async getUsersByTeam(team) {
    return await User.findAll({ 
      where: { team },
      attributes: { exclude: ['password'] }
    });
  }

  static async updateUserTeam(email, team) {
    return await User.update(
      { team },
      { where: { email } }
    );
  }

  static verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;

