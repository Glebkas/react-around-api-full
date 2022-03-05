require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';

const errorResponseMessages = {
  serverError: 'An error has occured on the server',
  invalidCard: 'Invalid card',
  invalidCardId: 'Invalid card id',
  noCardIdMatch: 'No card found with matching id',
  noUserIdMatch: 'No user found with matching id',
  invalidUserId: 'Invalid user id',
  invalidUserData: 'Invalid user data',
  invalidUserProfile: 'Invalid user profile',
  invalidAvatarUrl: 'Invalid avatar url',
  userAlreadyExistError: 'Email is already used',
  unauthenticatedToDeleteError: 'you are unauthorized to delete this card',
  unauthenticatedUser: 'Unauthorized user',
  notFoundError: 'Requested resource not found',
};
const errorResponse = {
  badRequestErrorCode: 400,
  notFoundErrorCode: 404,
  internalServerErrorCode: 500,
  conflictErrorCode: 409,
  unauthenticatedErrorCode: 401,

};

const goodResponse = {
  okCode: 200,
  okCreateCode: 201,
};

module.exports = {
  errorResponseMessages,
  goodResponse,
  errorResponse,
  secretKey,
};
