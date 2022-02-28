const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers, getUserById, getUserMe, updateUserAvatar, updateUserInfo,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/users/me', getUserMe);
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^https?:\/{2}(www\.)?[a-z\0-9]{1,}\.[a-z]{1,}(\/[a-z0-9._~:/?%#@!$&'[\]()*+,;=]*)?/),
  }),
}), updateUserAvatar);

module.exports = router;
