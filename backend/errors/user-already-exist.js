const { errorResponse } = require('../utils/constants');

class UserAlreadyExist extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorResponse.conflictErrorCode;
  }
}

module.exports = UserAlreadyExist;
