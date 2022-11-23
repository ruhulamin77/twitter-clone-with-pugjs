const mongoose = require('mongoose');
const { redisClient } = require('../utils/cacheManager');
async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connection established');
    await redisClient.connect();
    console.log('Redis connection established');
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDb;
