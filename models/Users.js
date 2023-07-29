const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']    
    },
    thoughts: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'Thoughts'
      }
    ],
    friends: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'Users' 
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
const Users = model('Users', userSchema);

module.exports = Users;
