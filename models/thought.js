const { Schema, model } = require('mongoose');
const User = require('./User');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    buildSuccess: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
    tags: [Tag],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);