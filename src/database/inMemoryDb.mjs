/*
  Simple in-memory database to store users and tweets.
  This is just for demonstration and learning purposes and should not be used in production.
  
  user: { username, password , token, createdAt }
  tweet: { id, title, content, userUsername, createdAt }
*/
import { v4 as uuidv4 } from "uuid";

const InMemoryDb = {
  users: [{
    username: "testuser",
    password: "password123",
    createdAt: new Date(),
  }],
  tweets: [],
};

InMemoryDbService = {
  user: {
    getUsers() {
      return InMemoryDb.users;
    },
    addUser(user) {
      InMemoryDb.users.push(user);
    },
    addUserToken(username, token) {
      const user = InMemoryDb.users.find((user) => user.username === username);
      if (user) {
        user.token = token;
        return true;
      }
      return false;
    },
    removeUserToken(username) {
      const user = InMemoryDb.users.find((user) => user.username === username);
      if (user) {
        delete user.token;
        return true;
      }
      return false;
    },
    findUserByUsername(username) {
      const user = InMemoryDb.users.find((user) => user.username === username);
      return user || null;
    },
    findUserByToken(token) {
      const user = InMemoryDb.users.find((user) => user.token === token);
      return user || null;
    },
  },
  tweets: {
    getAllTweets() {
      return InMemoryDb.tweets;
    },
    getTweetsByUserUsername(userUsername) {
      return InMemoryDb.tweets.filter(
        (tweet) => tweet.userUsername === userUsername
      );
    },
    getTweetById(id) {
      return InMemoryDb.tweets.find((tweet) => tweet.id === id);
    },
    createTweet(tweet) {
      const newTweet = {
        ...tweet,
        id: uuidv4(), // Generate a UUID for the tweet ID
        createdAt: new Date(),
      };
      InMemoryDb.tweets.push(newTweet);
      return newTweet;
    },
    updateTweet(id, content) {
      const tweetIndex = InMemoryDb.tweets.findIndex(
        (tweet) => tweet.id === id
      );
      if (tweetIndex !== -1) {
        InMemoryDb.tweets[tweetIndex].content = content;
        return InMemoryDb.tweets[tweetIndex];
      }
      return null;
    },
    deleteTweet(id) {
      const tweetIndex = InMemoryDb.tweets.findIndex(
        (tweet) => tweet.id === id
      );
      if (tweetIndex !== -1) {
        const deletedTweet = InMemoryDb.tweets[tweetIndex];
        InMemoryDb.tweets.splice(tweetIndex, 1);
        return deletedTweet;
      }
      return null;
    },
  },
};

export default InMemoryDbService;
