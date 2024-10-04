const mongoose = require('mongoose');
const { isAfter } = require('date-fns');
const { contentSchema, loginSchema } = require('../utils/validation');
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      validate: {
        validator: (value) => contentSchema.isValid(value),
        message: (props) => `Error: ${props.value} is invalid content`,
      },
    },
    author: {
      login: {
        type: String,
        required: true,
        validate: {
          validator: (value) => loginSchema.isValid(value),
          message: (props) => `Error: ${props.value} is invalid login`,
        },
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
      },
    },
    datePublic: {
      type: Date,
      validate: {
        validator: (value) => isAfter(value, Date.now()),
        message: (props) => `Error: ${props.value} is invalid datePublic`,
      },
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isImportant: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
