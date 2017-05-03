/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getCurrentUser: function(req, res) {
        User.findOne({
            id: req.body.id
        }).exec(function(err, u) {
            if (err) {
                return res.serverError(err);
            }
            if (!u) {
                return res.notFound('Could not find user, sorry.', req.body);
            }

            sails.log('Found "%s"', u.name);
            return res.json(u);
        });
    },

    getUser: function(req, res) {
        User.findOne({
            id: req.body.id
        }).exec(function(err, u) {
            if (err) {
                return res.serverError(err);
            }
            if (!u) {
                return res.notFound('Could not find user, sorry.', req.body);
            }

            sails.log('Found "%s"', u.name);
            return res.json(u);
        });
    },

    editUser: function(req, res) {
        User.findOne({
            id: req.body.id
        }).exec(function(err, u) {
            if (err) {
                return res.serverError(err);
            }
            if (!u) {
                return res.notFound('Could not find user, sorry.', req.body);
            }

            sails.log('Found "%s"', u.name);
            return res.json(u);
        });
    }
};