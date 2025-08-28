import { Router } from "express";

const UserRouter = Router();

const users = [];

// Register new user
UserRouter.post("/api/users", (req, res) => {
  /*
    register user
    example body
    {
      "username": "user1",
      "password": "pass123",
      "confirmPassword": "pass123"
    }
  */
});

// Get all users
UserRouter.get("/api/users", (req, res) => {
  /*
    Get all users that are registered
  */
});

// Get profile of logged in user
UserRouter.get("/api/users/me", (req, res) => {
  /*
    Get profile of logged in user
    Header:
    Authorization Bearer <token>
  */
});

// Login user
UserRouter.post("/api/users/login", (request, response) => {
  /*
    login user
    example body
    {
      "username": "user1",
      "password": "pass123"
    }
  */
});

// Logout user
UserRouter.post("/api/users/logout", (request, response) => {
  /*
    Logout user
    example body
    {
      token: "user-token"
    }
  */
});

export default UserRouter;
