const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getAllCards, deleteCardbyId, createNewCard, likeCardbyId, unlikeCardbyId,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(http|https):\/\/[^ "]+$/),
  }),
}), createNewCard);

router.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
}), likeCardbyId);

router.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
}), unlikeCardbyId);

router.delete('/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
}), deleteCardbyId);

module.exports = router;
