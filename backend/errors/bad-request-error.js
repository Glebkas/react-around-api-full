const { errorResponse } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorResponse.badRequestErrorCode;
  }
}

module.exports = BadRequestError;
