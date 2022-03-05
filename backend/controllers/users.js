const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-error');
const UserAlreadyExist = require('../errors/user-already-exist');
const { secretKey } = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-error');
const { errorResponseMessages, goodResponse } = require('../utils/constants');

const User = require('../models/user');

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(goodResponse.okCode).send({ data: users });
    })
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorResponseMessages.invalidUserId);
      }
      return res.status(goodResponse.okCode).send({ data: user });
    })
    .catch((err) => next(err));
};

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorResponseMessages.noUserIdMatch);
      }
      return res.status(goodResponse.okCode).send({ data: user });
    })
    .catch((err) => next(err));
};

const createNewUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new UserAlreadyExist(errorResponseMessages.userAlreadyExistError);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => {
      res.status(goodResponse.okCreateCode).send({
        email: user.email,
        _id: user._id,
      });
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError(errorResponseMessages.noUserIdMatch))
    .then((user) => {
      res.status(goodResponse.okCode).send({ data: user });
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(errorResponseMessages.noUserIdMatch))
    .then((user) => {
      res.status(goodResponse.okCode).send({ data: user });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });

      res.status(goodResponse.okCode).send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorResponseMessages.serverError));
      }
      next(err);
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserAvatar,
  updateUserInfo,
  login,
  getUserMe,
};
