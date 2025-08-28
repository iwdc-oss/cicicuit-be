import { Router } from "express";
import InMemoryDbService from "../database/inMemoryDb.mjs";
import { authenticateToken } from "../middleware/auth.middleware.mjs";

const TweetRouter = Router();

// Get all tweets
TweetRouter.get("/api/tweets", (req, res) => {
  /*
    Get all tweets
  */
  try {
    const tweets = InMemoryDbService.tweets.getAllTweets();
    return res.status(200).json(tweets);
  } catch (error) {
    return res.status(500);
  }
});

// Get tweet by ID
TweetRouter.get("/api/tweets/:id", (req, res) => {
  /*
    Get a specific tweet by ID
  */
  try {
    const tweetId = req.params.id;
    const tweet = InMemoryDbService.tweets.getTweetById(tweetId);

    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
      });
    }

    return res.status(200).json({
      message: "Tweet found",
      tweet: tweet,
    });
  } catch (error) {
    return res.status(500);
  }
});

// Create a new tweet
TweetRouter.post("/api/tweets", authenticateToken, (req, res) => {
  /*
    Create a new tweet
    Header:
    Authorization Bearer <token>

    Example body:
    {
      "content": "This is my first tweet!"
    }
  */
  try {
    const title = req.body.title;
    const content = req.body.content;

    if (!title) {
      return res.status(400).json({ message: "Title tidak boleh kosong" });
    }

    if (!content) {
      return res.status(400).json({ message: "Content tidak boleh kosong" });
    }

    const newTweet = {
      title: title,
      content: content,
      userUsername: req.user.username,
    };

    const createdTweet = InMemoryDbService.tweets.createTweet(newTweet);

    return res.status(201).json({
      message: "Tweet berhasil dibuat",
      tweet: createdTweet,
    });
  } catch (error) {
    res.status(500);
  }
});

// Edit a tweet
TweetRouter.put("/api/tweets/:id", authenticateToken, (req, res) => {
  /*
    Edit an existing tweet
    Header:
    Authorization Bearer <token>

    Example body:
    {
      "content": "Updated tweet content"
    }
  */
  try {
    const tweetId = req.params.id;
    const content = req.body.content;

    if (!content) {
      return res.status(400).json({ message: "Content tidak boleh kosong" });
    }

    const isTweetExists = InMemoryDbService.tweets.getTweetById(tweetId);
    if (!isTweetExists) {
      return res.status(404).json({
        message: "Tweet not found",
      });
    }

    if (isTweetExists.userUsername !== req.user.username) {
      return res.status(403).json({
        message: "You are not authorized to edit this tweet",
      });
    }

    const updatedTweet = InMemoryDbService.tweets.updateTweet(tweetId, content);
    return res.status(200).json({
      message: "Tweet updated successfully",
      tweet: updatedTweet,
    });
  } catch (error) {
    return res.status(500);
  }
});

// Delete a tweet
TweetRouter.delete("/api/tweets/:id", authenticateToken, (req, res) => {
  /*
    Delete a tweet
    Header:
    Authorization Bearer <token>
  */
  try {
    const tweetId = req.params.id;

    const isTweetExists = InMemoryDbService.tweets.getTweetById(tweetId);
    if (!isTweetExists) {
      return res.status(404).json({
        message: "Tweet not found",
      });
    }

    if (isTweetExists.userUsername !== req.user.username) {
      return res.status(403).json({
        message: "You are not authorized to delete this tweet",
      });
    }

    InMemoryDbService.tweets.deleteTweet(tweetId);
    return res.status(200).json({
      message: "Tweet deleted successfully",
    });
  } catch (error) {
    return res.status(500);
  }
});

export default TweetRouter;
