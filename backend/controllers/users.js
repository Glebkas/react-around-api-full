const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { errorResponseMessages, errorResponse } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res
      .status(errorResponse.internalServerErrorCode)
      .send({ message: errorResponseMessages.serverError }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error(errorResponseMessages.noUserIdMatch);
      error.statusCode = errorResponse.notFoundErrorCode;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(errorResponse.badRequestErrorCode)
          .send({ message: errorResponseMessages.invalidUserId });
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

const createNewUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    })
      .then((user) => {
        res.status(201).send({ data: user });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res
            .status(errorResponse.badRequestErrorCode)
            .send({ message: errorResponseMessages.invalidUserProfile });
        } else {
          res
            .status(errorResponse.internalServerErrorCode)
            .send({ message: errorResponseMessages.serverError });
        }
      }));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error(errorResponseMessages.noUserIdMatch);
      error.statusCode = errorResponse.notFoundErrorCode;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(errorResponse.badRequestErrorCode)
          .send({ message: errorResponseMessages.invalidAvatarUrl });
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

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error(errorResponseMessages.noUserIdMatch);
      error.statusCode = errorResponse.notFoundErrorCode;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(errorResponse.badRequestErrorCode)
          .send({ message: errorResponseMessages.invalidUserData });
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

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(errorResponse.badRequestErrorCode)
          .send({ message: errorResponseMessages.invalidAvatarUrl });
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
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserAvatar,
  updateUserInfo,
  login,
};
