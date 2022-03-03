const Card = require('../models/card');
const AuthorizationError = require('../errors/authorization-error');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

const { errorResponseMessages, goodResponse } = require('../utils/constants');

const getAllCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      res.status(goodResponse.okCode).send({ data: cards });
    })
    .catch((err) => next(err));
};

const createNewCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.populate(card, { path: 'owner' })
        .then(() => {
          res.status(goodResponse.okCode).send({ data: card });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorResponseMessages.serverError));
      }
      next(err);
    });
};

const deleteCardbyId = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail(new NotFoundError(errorResponseMessages.noCardIdMatch))
    .then((card) => {
      if (card.owner._id.toString() !== userId) {
        throw new AuthorizationError(errorResponseMessages.unauthenticatedToDeleteError);
      }

      Card.findByIdAndDelete(cardId)
        .then(() => {
          res.status(goodResponse.okCode).send({ message: 'Card removed' });
        });
    })
    .catch(next);
};

const likeCardbyId = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError(errorResponseMessages.noCardIdMatch))
    .populate('owner')
    .populate('likes')
    .then((card) => {
      res.status(goodResponse.okCode).send({ data: card });
    })
    .catch(next);
};

const unlikeCardbyId = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError(errorResponseMessages.noCardIdMatch))
    .populate('owner')
    .populate('likes')
    .then((card) => {
      res.status(goodResponse.okCode).send({ data: card });
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  createNewCard,
  deleteCardbyId,
  likeCardbyId,
  unlikeCardbyId,
};
