import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import PrismaDbService from "../database/prismaDbService.mjs";
import { authenticateToken } from "../middleware/auth.middleware.mjs";

const UserRouter = Router();

// Register new user
UserRouter.post("/api/users", async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Check if username is already taken
    const existingUser = await PrismaDbService.user.findUserByUsername(
      username
    );
    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    // Create new user
    const newUser = {
      username,
      password, // This should be hashed!!!!!!!
      token: null,
      createdAt: new Date(),
    };

    await PrismaDbService.user.addUser(newUser);

    // Return user without password
    delete newUser.password;
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
});

// Get all users
UserRouter.get("/api/users", async (req, res) => {
  try {
    const users = await PrismaDbService.user.getUsers();

    const usersWithoutPasswords = users.map((user) => {
      const { password, token, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving users",
      error: error.message,
    });
  }
});

// Get profile of logged in user
UserRouter.get("/api/users/me", authenticateToken, async (req, res) => {
  try {
    const username = req.user.username;
    const user = await PrismaDbService.user.findUserByUsername(username);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    delete user.password;
    delete user.token;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving user profile",
      error: error.message,
    });
  }
});

// Login user
UserRouter.post("/api/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // Find user
    const user = await PrismaDbService.user.findUserByUsername(username);

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Generate token
    const token = uuidv4();

    // Save token to user
    await PrismaDbService.user.addUserToken(username, token);

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error during login",
      error: error.message,
    });
  }
});

// Logout user
UserRouter.post("/api/users/logout", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }

    // Find user by token
    const user = await PrismaDbService.user.findUserByToken(token);

    if (!user) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    // Remove token
    await PrismaDbService.user.removeUserToken(user.username);

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error during logout",
      error: error.message,
    });
  }
});

export default UserRouter;
