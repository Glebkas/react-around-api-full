const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-error');
const { secretKey } = require('../utils/constants');

const extractBearerToken = (header) => header.replace('Bearer ', '');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError());
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new AuthorizationError());
  }

  req.user = payload;
  return next();
};

module.exports = auth;
