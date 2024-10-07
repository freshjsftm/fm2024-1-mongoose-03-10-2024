const Message = require('../models/Message');
const Emotion = require('../models/Emotion');

module.exports.createMessage = async (req, res, next) => {
  try {
    const { body } = req;
    const message = await Message.create(body);
    if (!message) {
      return next(new Error('bad request'));
    }
    res.status(201).send({ data: message });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();
    if (!messages) {
      return next(new Error('bad request'));
    }
    res.status(200).send({ data: messages });
  } catch (error) {
    next(error);
  }
};

module.exports.getMessage = async (req, res, next) => {
  try {
    const {
      params: { msgId },
    } = req;
    //const message = await Message.findById(msgId).populate('emotions').exec();
    const message = await Message.findById(msgId).populate({path: 'emotions', select: 'name'});
    if (!message) {
      return next(new Error('message not found'));
    }
    res.status(200).send({ data: message });
  } catch (error) {
    next(error);
  }
};

module.exports.updateMessage = async (req, res, next) => {
  try {
    const {
      params: { msgId },
      body,
    } = req;
    const message = await Message.findByIdAndUpdate(msgId, body, { new: true });
    if (!message) {
      return next(new Error('message not found'));
    }
    res.status(200).send({ data: message });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  try {
    const {
      params: { msgId },
    } = req;
    const message = await Message.findByIdAndDelete(msgId);
    if (!message) {
      return next(new Error('message not found'));
    }
    //delete all emotions 
    await Emotion.deleteMany({messageId: msgId});
    res.status(200).send({ data: message });
  } catch (error) {
    next(error);
  }
};
