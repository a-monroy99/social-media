const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController.js');

// /api/user
router.route('/').get(getUsers).post(createUser);

// api/user/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  // delete;
  .delete(deleteUser);

// api/user/:userId/friends
router.route('/:userId/friends').post(addFriend);

// api/user/:userId/friends/:friendsId
router.route('/:userId/friends/:friendsId').delete(removeFriend);
module.exports = router;