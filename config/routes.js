/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    // NOTE all routes defined before the 'GET /*' will override

    // All GET requests are directed to the app controller which renders our app.
    '/': {
        controller: 'AppController',
        action: 'index',
        skipAssets: true,
    },

    'POST /login': 'AccountController.login',
    'POST /trial': 'AccountController.trial',
    'POST /signup': 'AccountController.signup',
    'GET /auth/verify-email/:token': 'AccountController.verify_email',
    'GET /users/@me': 'UserController.me',
    'PATCH /users/@me': 'UserController.editUser',
    'GET /users/@me/channels': 'UserController.getChannels',
    'GET /users/:id': 'UserController.getUser',
    'POST /auth/refresh-token': 'AccountController.refreshToken',

    'GET /channels/:id': 'ChannelController.getChannel',
    'POST /channels': 'ChannelController.createChannel',
    'PATCH /channels/:id': 'ChannelController.editChannel',
    'DELETE /channels/:id': 'ChannelController.deleteChannel',
    'GET /channels/:id/members': 'ChannelController.getMembers',
    'PUT /channels/:id/members': 'ChannelController.joinChannel',

};