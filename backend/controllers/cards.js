const Card = require('../models/card');
const AuthorizationError = require('../errors/authorization-error');
const NotFoundError = require('../errors/not-found-error');

const getAllCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

const createNewCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.populate(card, { path: 'owner' })
        .then(() => {
          res.send({ data: card });
        });
    })
    .catch(next);
};

const deleteCardbyId = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail(new NotFoundError())
    .then((card) => {
      if (card.owner._id.toString() !== userId) {
        throw new AuthorizationError();
      }

      Card.findByIdAndDelete(cardId)
        .then(() => {
          res.send({ message: 'Card removed' });
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
    .orFail(new NotFoundError())
    .populate('owner')
    .populate('likes')
    .then((card) => {
      res.send({ data: card });
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
    .orFail(new NotFoundError())
    .populate('owner')
    .populate('likes')
    .then((card) => {
      res.send({ data: card });
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
