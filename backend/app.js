const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  celebrate, Joi, errors, Segments,
} = require('celebrate');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const users = require('./routes/users');
const cards = require('./routes/cards');
const { login, createNewUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middleware/logger');
const auth = require('./middleware/auth');
const error = require('./middleware/error');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors({
  origin: ['https://glebkas.students.nomoreparties.sbs', 'https://api.glebkas.students.nomoreparties.sbs/signin']
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(requestLogger);
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb');

app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
    }),
  }),
  createNewUser,
);

app.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.use('/users', auth, users);
app.use('/cards', auth, cards);

app.use(helmet());

app.get('*', (req, res) => {
  res.status(404);
  res.send({ message: 'Requested resource not found' });
});

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
