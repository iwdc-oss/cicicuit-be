import { Router } from "express";

const UserRouter = Router();

UserRouter.get("/api/users", (request, response, nextFunction) => {
  return response.status(200).json({ data: "test user" });
});

export default UserRouter;
