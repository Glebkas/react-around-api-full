const Card = require('../models/card');
const { errorResponseMessages, errorResponse } = require('../utils/constants');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res
      .status(errorResponse.internalServerErrorCode)
      .send({ message: errorResponseMessages.serverError }));
};

const createNewCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(errorResponse.badRequestErrorCode)
          .send({ message: errorResponseMessages.invalidCard });
      } else {
        res
          .status(errorResponse.internalServerErrorCode)
          .send({ message: errorResponseMessages.serverError });
      }
    });
};

const deleteCardbyId = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const error = new Error(errorResponseMessages.noCardIdMatch);
      error.statusCode = errorResponse.notFoundErrorCode;
      throw error;
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(errorResponse.badRequestErrorCode)
          .send({ message: errorResponseMessages.invalidCardId });
      } else if (err.statusCode === errorResponse.notFoundErrorCode) {
        res
          .status(errorResponse.notFoundErrorCode)
          .send({ message: err.message });
      } else {
        res
          .status(errorResponse.internalServerErrorCode)
          .send({ message: errorResponseMessages.serverError });
      }
    });
};

const likeCardbyId = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error(errorResponseMessages.noCardIdMatch);
      error.statusCode = errorResponse.notFoundErrorCode;
      throw error;
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(errorResponse.badRequestErrorCode)
          .send({ message: errorResponseMessages.invalidCardId });
      } else if (err.statusCode === errorResponse.notFoundErrorCode) {
        res
          .status(errorResponse.notFoundErrorCode)
          .send({ message: err.message });
      } else {
        res
          .status(errorResponse.internalServerErrorCode)
          .send({ message: errorResponseMessages.serverError });
      }
    });
};

const unlikeCardbyId = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error(errorResponseMessages.noCardIdMatch);
      error.statusCode = errorResponse.notFoundErrorCode;
      throw error;
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(errorResponse.badRequestErrorCode)
          .send({ message: errorResponseMessages.invalidCardId });
      } else if (err.statusCode === errorResponse.notFoundErrorCode) {
        res
          .status(errorResponse.notFoundErrorCode)
          .send({ message: err.message });
      } else {
        res
          .status(errorResponse.internalServerErrorCode)
          .send({ message: errorResponseMessages.serverError });
      }
    });
};

module.exports = {
  getAllCards,
  createNewCard,
  deleteCardbyId,
  likeCardbyId,
  unlikeCardbyId,
};
