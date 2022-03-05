const { errorResponse, errorResponseMessages } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message = errorResponseMessages.notFoundError) {
    super(message);
    this.statusCode = errorResponse.notFoundErrorCode;
  }
}

module.exports = NotFoundError;
