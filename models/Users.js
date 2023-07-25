const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      required: true,
      unqique: true,
      match: "/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/"
    },
    thoughts: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'Thought'
      }
    ],
    friends: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

// Create a virtual property `friendCount` that retreives the friend count
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

  // Initialize our User model
const Users = model('user', userSchema);

module.exports = Users;
