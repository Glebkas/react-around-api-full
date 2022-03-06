const { errorResponse } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorResponse.forbiddenErrorCode;
  }
}

module.exports = ForbiddenError;
