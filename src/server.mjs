import express from "express";
import TweetRouter from "./routes/tweet.route.mjs";
import UserRouter from "./routes/user.route.mjs";

const app = express();
app.use(express.json());

app.use(UserRouter);
app.use(TweetRouter);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
