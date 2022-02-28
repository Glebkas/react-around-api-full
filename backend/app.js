const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const users = require('./routes/users');
const cards = require('./routes/cards');
const { login, createNewUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.options('*', cors());
app.use(cors());

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
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /^https?:\/{2}(www\.)?[a-z\0-9]{1,}\.[a-z]{1,}(\/[a-z0-9._~:/?%#@!$&'[\]()*+,;=]*)?/,
      ),
    }),
  }),
  createNewUser.apply,
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.use('/users', users);
app.use('/cards', cards);

app.use(helmet());

app.get('*', (req, res) => {
  res.status(404);
  res.send({ message: 'Requested resource not found' });
});

app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {});
