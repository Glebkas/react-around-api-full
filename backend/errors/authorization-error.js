const { errorResponse } = require('../utils/constants');

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorResponse.unauthenticatedErrorCode;
  }
}

module.exports = AuthorizationError;
