const Thoughts = require('../models/Thoughts')
const Users = require('../models/Users')

module.exports = {
  getThoughts (req, res) {
    // get all thoughts
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // get single thoughts by id
  getSingleThoughts (req, res) {
    Thoughts.findOne({ _id: req.params.thoughtsId })
      .then((thoughts) => 
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with that ID' })
          : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
  },
  // create thought
  createThoughts (req, res) {
    Thoughts.create(req.body)
    .then((thoughts) => {
      return Users.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughts._id } },
        { new: true }
      );
    })
    .then((user) => 
      !user 
        ? res.status(400).json({
            message: 'Thoughts created, but found no User with that ID'
          })
        : res.json('Created the Thought!')
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // update thought
  updateThought (req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { returnOriginal: false }
    )
      .then((thoughts) => 
      !thoughts
        ? res.status(400).json({ message: 'No thought with that id' })
        : res.json(thoughts)
      )
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      });
  },
  // remove thought
  deleteThought (req, res) {
    Thoughts.findOneAndRemove({ _id: req.params.thoughtsId })
      .then((thoughts) => 
        !thoughts
          ? res.status(400).json({ message: 'No thought with this id' })
          : Users.findOneAndUpdate(
            { thoughts: req.params.thoughtsId },
            { $pull: { thoughts: req.params.thoughtsId } },
            { runValidators: true, new: true }
          )
      )
      .then((user) => 
        !user
          ? res
              .status(404)
              .json({ message: 'Thought deleted but no user with that id' })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => res.status(500).json(err))
  },
  // add reaction
  addThoughtReaction (req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with that id' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err))
  },
  // delete reaction
  deleteThoughtReaction (req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $pull: { reactions: { reactionsId: req.params.reactionsId } } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with that id' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err))
  }
};