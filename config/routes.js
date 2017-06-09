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
  "POST /api/login": "AccountController.login",
  "POST /api/trial": "AccountController.trial",
  "POST /api/register": "AccountController.register",
  "GET /api/verify-email/:token": "AccountController.verify_email",

  "GET /api/users": "User.find", // DISABLE IN PRODUCTION
  "GET /api/users/@me": "UserController.me",
  "PATCH /api/users/@me": "UserController.editUser",
  "GET /api/users/@me/channels": "UserController.getChannels",
  "GET /api/users/:id": "UserController.getUser",
  "POST /api/refresh-token": "AccountController.refreshToken",

  "GET /api/channels": "Channel.find",
  "GET /api/channels/:id": "ChannelController.getChannel",
  "POST /api/channels": "ChannelController.createChannel",
  "PATCH /api/channels/:id": "ChannelController.editChannel",
  "DELETE /api/channels/:id": "ChannelController.deleteChannel",
  "GET /api/channels/:id/members": "ChannelController.getMembers",
  "PUT /api/channels/:id/members": "ChannelController.joinChannel",
  "DELETE /api/channels/:id/members": "ChannelController.leaveChannel",

  "POST /api/channels/:id/messages": "ChannelController.postMessage",
  "GET /api/channels/:id/messages": "ChannelController.getMessages",
  "PATCH /api/channels/:id/messages/:message_id":
    "ChannelController.editMessage",
  "DELETE /api/channels/:id/messages/:message_id":
    "ChannelController.deleteMessage",

  // All GET requests are directed to the app controller which renders our app.
  "GET /*": {
    controller: "AppController",
    action: "index",
    skipAssets: true
  }
};
