import { Router } from "express";

const TweetRouter = Router();

// Get all tweets
TweetRouter.get("/api/tweets", (req, res) => {
  /*
    Get all tweets
  */
});

// Get tweet by ID
TweetRouter.get("/api/tweets/:id", (req, res) => {
  /*
    Get a specific tweet by ID
  */
});

// Create a new tweet
TweetRouter.post("/api/tweets", (req, res) => {
  /*
    Create a new tweet
    Header:
    Authorization Bearer <token>

    Example body:
    {
      "content": "This is my first tweet!"
    }
  */
});

// Edit a tweet
TweetRouter.put("/api/tweets/:id", (req, res) => {
  /*
    Edit an existing tweet
    Header:
    Authorization Bearer <token>

    Example body:
    {
      "content": "Updated tweet content"
    }
  */
});

// Delete a tweet
TweetRouter.delete("/api/tweets/:id", (req, res) => {
  /*
    Delete a tweet
    Header:
    Authorization Bearer <token>
  */
});

export default TweetRouter;
