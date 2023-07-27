const router = require('express').Router()
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  updateThought,
  deleteThought,
  addThoughtReaction,
  deleteThoughtReaction
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// api/thoughts/:thoughtsId
router
  .route('/:thoughtsId')
  .get(getSingleThoughts)
  .put(updateThought)
  // delete
  .delete(deleteThought);

// api/user/:thoughtsId/reactions
router.route('/:thoughtsId/reactions').post(addThoughtReaction);

// api/user/:userId/friends/:friendsId
router.route('/:userId/friends/:friendsId').delete(deleteThoughtReaction);

module.exports = router