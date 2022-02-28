const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getAllUsers, getUserById, getUserMe, updateUserAvatar, updateUserInfo,
} = require('../controllers/users');

router.get('/users/me', getUserMe);

router.patch('/users/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/users/me/avatar', celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(http|https):\/\/[^ "]+$/),
  }),
}), updateUserAvatar);

router.get('users/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().required().length(24),
  }),
}), getUserById);

router.get('/users', getAllUsers);

module.exports = router;
