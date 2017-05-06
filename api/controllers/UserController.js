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
        }).exec((err, u) => {
            if (err) {
                return res.serverError(err);
            }
            if (!u) {
                return res.notFound('Could not find user, sorry.', req.body);
            }

            sails.log('Found "%s"', u.username);
            return res.ok(u);
        });
    },

    editUser: (req, res) => {
        User.find(req.access_token.user).limit(1)
            .exec((err, u) => {
                if (err) {
                    return res.serverError(err);
                }
                if (!u) {
                    return res.notFound('Could not find user, sorry.', req.body);
                }
                u = u[0];

                sails.log('Found "%s"', u.username);

                if (req.body.username)
                    u.username = req.body.username;
                if (req.body.avatar)
                    u.avatar = req.body.avatar;

                u.save((err) => {
                    if (err) console.log(err)
                    else res.ok(u);
                })

            });
    },

    getChannels: (req, res) => {
        User.find(req.access_token.user).limit(1).populate('channels')
            .exec((err, u) => {
                if (err) return res.serverError(err)
                else if (!u) return res.notFound('cannot find');
                u = u[0];
                // console.log(u);

                return res.ok(u.channels);
            })
    }
};