const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-error');
const { secretKey } = require('../utils/constants');

const User = require('../models/user');

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError())
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError())
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const createNewUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError())
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError())
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
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
