const {Schema, Types} = require('mongoose')

const reactionSchema = new Schema(
  {
    reactionId:  {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => {
        return moment(createdAtVal).format("YYYY-MM-DD hh:mm a");
      }
    }
  }
)

module.exports = reactionSchema