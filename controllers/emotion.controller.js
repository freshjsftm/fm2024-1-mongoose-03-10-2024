const Emotion = require('../models/Emotion');
const Message = require('../models/Message');

module.exports.createEmotion = async (req, res, next) => {
  try {
    const {
      params: { msgId },
      body,
    } = req;
    const message = await Message.findById(msgId);
    if (!message) {
      return next(new Error('message not found'));
    }
    const emotion = await Emotion.create({ ...body, messageId: msgId });
    if (!emotion) {
      return next(new Error('emotion bad request'));
    }
    res.status(201).send({ data: emotion });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllEmotions = async (req, res, next) => {
  try {
    const {
      params: { msgId },
    } = req;
    const message = await Message.findById(msgId);
    if (!message) {
      return next(new Error('message not found'));
    }
    const emotions = await Emotion.find({messageId:msgId}).populate('messageId').exec();
    if (!emotions) {
      return next(new Error('emotion bad request'));
    }
    res.status(200).send({ data: emotions });
  } catch (error) {
    next(error);
  }
};
