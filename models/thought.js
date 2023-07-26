const { Schema, model } = require('mongoose');
const Reaction = require('./Reactions')
const moment = require("moment");

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => {
        return moment(createdAtVal).format("YYYY-MM-DD hh:mm a");
      },
    },
    username: {
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    reactions:
      [Reaction]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Make virtual for reaction count
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;
