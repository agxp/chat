/**
 * ChannelController
 *
 * @description :: Server-side logic for managing channels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getChannel: (res, req) => {
        Channel.findOne({
            id: req.params.id
        }).exec((err, channel) => {
            if (err) {
                return res.serverError(err);
            }
            if (!channel) {
                return res.notFound('Could not find channel, sorry.', req.body);
            }

            sails.log('Found channel: "%s"', channel.name);
            return res.json(channel);
        })
    },

    createChannel: (res, req) => {
        User.find(req.access_token.user).limit(1)
            .exec((err, u) => {
                if (err) return res.serverError(err)
                else if (!u) return res.notFound('cannot find');

                u = u[0];

                // Channel.create()
            });
    }
};