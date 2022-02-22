const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

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
    default: 'Exporter',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator(v) {
        return /^https?:\/{2}(www\.)?[a-z\0-9]{1,}\.[a-z]{1,}(\/[a-z0-9._~:/?%#@!$&'[\]()*+,;=]*)?/gim.test(
          v,
        );
      },
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        console('Wrong email format');
      }

      return bcrypt.compare(password, user.password)
        .then((res) => {
          if (!res) {
            console('Wrong email format');
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
