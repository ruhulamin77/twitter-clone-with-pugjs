const Chat = require('../../models/Chat');
const User = require('../../models/User');
const { cacheSetAndGet } = require('../../utils/cacheManager');

const createChat = async (req, res, next) => {
  try {
    const user = await cacheSetAndGet(`users:${req.userId}`, async () => {
      const user = await User.findOne({ _id: req.userId });
      return user;
    });

    const users = req.body;
    users.push(user);

    if (users.length >= 3) {
      const chat = new Chat({
        chatName: '',
        chatImage: '',
        isGroupChat: true,
        users,
        latestMessage: null,
      });
      const result = await chat.save();
      res.send(result);
    } else {
      res.send({ message: 'Error saving chat' });
    }
  } catch (error) {
    next(error);
  }
};

// module exports
module.exports = createChat;
