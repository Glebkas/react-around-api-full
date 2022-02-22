const router = require('express').Router();
const {
  getAllUsers, getUserById, createNewUser, updateUserAvatar, updateUserInfo,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createNewUser);
router.patch('/me/avatar', updateUserAvatar);
router.patch('/me', updateUserInfo);

module.exports = router;
