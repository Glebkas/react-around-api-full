const router = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');

const {
  getAllUsers,
  getUserById,
  getUserMe,
  updateUserAvatar,
  updateUserInfo,
} = require('../controllers/users');

router.get('/me', getUserMe);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserInfo,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(/^(http|https):\/\/[^ "]+$/),
    }),
  }),
  updateUserAvatar,
);

router.get(
  '/:id',
  celebrate({
    body: Joi.object().keys({
      id: Joi.string().hex().required().length(24),
    }),
  }),
  getUserById,
);

router.get('/', getAllUsers);

module.exports = router;
