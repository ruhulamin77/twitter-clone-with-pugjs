// dependencies
const createHttpError = require('http-errors');
const User = require('../../models/User');
const { cacheSetAndGet } = require('../../utils/cacheManager');

// get home page
const getHomePage = async (req, res, next) => {
  try {
    const user = await cacheSetAndGet(`users:${req.userId}`, async () => {
      const user = await User.findOne({ _id: req.userId });
      return user;
    });

    return res.render('pages/home', {
      user: user ? user : {},
      otp: {},
      error: {},
    });
  } catch (error) {
    next(createHttpError(500, error));
  }
};
// exports
module.exports = getHomePage;
