import express from "express";
import UserRouter from "./routes/user.route.mjs";

const app = express();
app.use(express.json());

app.use(UserRouter);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
