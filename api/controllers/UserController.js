/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    me: (req, res) => {
        User.find(req.access_token.user).limit(1)
            .then(res.ok)
            .catch(res.negotiate);
    },

    getUser: (req, res) => {
        console.log(req.params.id);
        User.findOne({
            id: req.params.id
        }).exec(function (err, u) {
            if (err) {
                return res.serverError(err);
            }
            if (!u) {
                return res.notFound('Could not find user, sorry.', req.body);
            }

            sails.log('Found "%s"', u.username);
            return res.json(u);
        });
    },

    editUser: (req, res) => {
        User.find(req.access_token.user).limit(1)
            .exec(function (err, u) {
                if (err) {
                    return res.serverError(err);
                }
                if (!u) {
                    return res.notFound('Could not find user, sorry.', req.body);
                }
                u = u[0];

                sails.log('Found "%s"', u);

                if (req.body.username)
                    u.username = req.body.username;
                if (req.body.avatar)
                    u.avatar = req.body.avatar;

                u.save(function (err) {
                    if (err) console.log(err)
                    else res.json(u);
                })

            });
    },

    getChannels: (req, res) => {
        User.find(req.access_token.user).limit(1)
            .exec(function (err, u) {
                if (err) return res.serverError(err)
                else if (!u) return res.notFound('cannot find');

                console.log(u[0]);

                return res.json(u[0].channels);
            })
    }
};