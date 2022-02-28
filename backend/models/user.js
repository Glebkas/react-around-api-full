const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/authorization-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Wrong email format',
    },
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'acques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: 'Invalid url',
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError();
      }

      return bcrypt.compare(password, user.password)
        .then((res) => {
          if (!res) {
            throw new AuthorizationError();
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
