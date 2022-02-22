const errorResponseMessages = {
  serverError: 'An error has occured on the server',
  invalidCard: 'Invalid card',
  invalidCardId: 'Invalid card id',
  noCardIdMatch: 'No card card found with matching id',
  noUserIdMatch: 'No user found with matching id',
  invalidUserId: 'Invalid user id',
  invalidUserData: 'Invalid user data',
  invalidUserProfile: 'Invalid user profile',
  invalidAvatarUrl: 'Invalid avatar url',
};
const errorResponse = {
  badRequestErrorCode: 400,
  notFoundErrorCode: 404,
  internalServerErrorCode: 500,

};

module.exports = { errorResponseMessages, errorResponse };
