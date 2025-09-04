import prisma from "./prismaDb.mjs";

const PrismaDbService = {
  user: {
    async getUsers() {
      return await prisma.user.findMany();
    },
    async addUser(user) {
      return await prisma.user.create({
        data: user,
      });
    },
    async addUserToken(username, token) {
      return await prisma.user.update({
        where: { username },
        data: { token },
      });
    },
    async removeUserToken(username) {
      return await prisma.user.update({
        where: { username },
        data: { token: null },
      });
    },
    async findUserByUsername(username) {
      return await prisma.user.findUnique({
        where: { username },
      });
    },
    async findUserByToken(token) {
      if (!token) return null;
      return await prisma.user.findFirst({
        where: { token },
      });
    },
  },
  tweets: {
    async getAllTweets() {
      return await prisma.tweet.findMany({
        include: { user: true },
      });
    },
    async getTweetsByUserUsername(userUsername) {
      return await prisma.tweet.findMany({
        where: { userUsername },
      });
    },
    async getTweetById(id) {
      return await prisma.tweet.findUnique({
        where: { id },
      });
    },
    async createTweet(tweet) {
      return await prisma.tweet.create({
        data: tweet,
      });
    },
    async updateTweet(id, content) {
      return await prisma.tweet.update({
        where: { id },
        data: { content },
      });
    },
    async deleteTweet(id) {
      return await prisma.tweet.delete({
        where: { id },
      });
    },
  },
};

export default PrismaDbService;