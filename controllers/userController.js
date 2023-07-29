const Users = require('../models/Users');

module.exports = {
  // get all users
  getUsers(req, res) {
    Users.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // get a single user by id
  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    Users.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // update a user
  updateUser(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { returnOriginal: false }
      )
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
  // delete a user
  deleteUser(req, res) {
    Users.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json(user)
      )
      .catch((err) => res.status(500).json(err))
  },
  // add a new friend to users friend list
  addFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId},
      { $addToSet: {friends: req.params.friendsId} },
      { returnOriginal: false }
      )
        .then((user) => 
          !user
            ? res.status(404).json({ message: "No user with that ID" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
  },
  removeFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendsId } },
      { returnOriginal: false }
    )
      .then((user) => 
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err))
  }
};