module.exports.auth = {

  sendVerificationEmail: (user, activateToken) => {
    sails.log.error('You need to verify your email but I haven\'t set that up yet. For now go to http://locahost:5000/auth/verify-email/' + activateToken);
  },

  // Options concerning a user's identity
  identityOptions: {

    // Property to use for login (one of "email" or "username").
    loginProperty: 'email',

    trialLoginProperty: 'username',

    // Options for user signup. @see https://www.npmjs.com/package/request-helpers
    parameterBlueprint: ['username', {param: 'email', required: true}],

    // Whether or not you wish to require a user to validate their email address before being able to log in.
    requireEmailVerification: true
  },

  jwt: {
    payloadProperties: [],
    accessTokenTtl   : process.env.JWT_TOKEN_TTL || 86400,  // 1 day
    refreshTokenTtl  : process.env.JWT_REFRESH_TOKEN_TTL || 2592000, // 30 days
    secret           : process.env.JWT_SECRET || 'superSecretForDev'
  },

  wetland: false
};
