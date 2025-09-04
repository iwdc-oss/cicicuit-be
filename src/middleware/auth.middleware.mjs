import PrismaDbService from "../database/prismaDbService.mjs";

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authentication required. No token provided.",
      });
    }

    // Extract token from "Bearer [token]"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Invalid token format. Use 'Bearer [token]'",
      });
    }

    const token = parts[1];

    // Find user with this token
    const user = await PrismaDbService.user.findUserByToken(token);
    console.log(user);

    if (!user) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    // Attach user info to request object
    req.user = {
      username: user.username,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error authenticating user",
      error: error.message,
    });
  }
};
