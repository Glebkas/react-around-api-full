const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllCards, deleteCardbyId, createNewCard, likeCardbyId, unlikeCardbyId,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/{2}(www\.)?[a-z\0-9]{1,}\.[a-z]{1,}(\/[a-z0-9._~:/?%#@!$&'[\]()*+,;=]*)?/),
  }),
}), createNewCard);

router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), deleteCardbyId);

router.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), likeCardbyId);

router.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), unlikeCardbyId);

module.exports = router;
