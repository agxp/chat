/**
 * ChannelController
 *
 * @description :: Server-side logic for managing channels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getChannel: (req, res) => {
        Channel.findOne(req.params.id)
            .exec((err, channel) => {
                if (err) {
                    return res.serverError(err);
                }
                if (!channel) {
                    return res.notFound('Could not find channel, sorry.', req.body);
                }

                sails.log('Found channel: "%s"', channel.name);
                return res.ok(channel);
            })
    },

    createChannel: (req, res) => {
        User.find(req.access_token.user).limit(1)
            .exec((err, u) => {
                if (err) return res.serverError(err)
                else if (!u) return res.notFound('cannot find');

                if (!req.body.name) return res.serverError('missing parameter: name');

                u = u[0];

                Channel.create({
                    name: req.body.name,
                    admin_id: u.id
                }).exec(function(err, channel) {
                    if (err) { return res.serverError(err); }

                    if (req.body.topic) channel.topic = req.body.topic;
                    if (req.body.icon) channel.icon = req.body.icon;

                    channel.members.add(u.id);
                    channel.save();
                    sails.log('created channel:', channel.name);

                    u.channels.add(channel.id);
                    u.save();

                    return res.ok(channel);
                });
            });
    },

    editChannel: (req, res) => {
        Channel.findOne(req.params.id)
            .exec((err, channel) => {
                if (err) {
                    return res.serverError(err);
                }
                if (!channel) {
                    return res.notFound('Could not find channel, sorry.', req.body);
                }
                if (req.access_token.user != channel.admin_id) {
                    return res.forbidden('You are not the admin');
                }

                if (req.body.name) channel.name = req.body.name;
                if (req.body.topic) channel.topic = req.body.topic;
                if (req.body.icon) channel.icon = req.body.icon;

                channel.save();
                sails.log('edited channel:', channel.name);

                return res.ok(channel);
            })
    },

    deleteChannel: (req, res) => {
        Channel.findOne(req.params.id).populate('members')
            .exec((err, channel) => {
                if (err) {
                    return res.serverError(err);
                }
                if (!channel) {
                    return res.notFound('Could not find channel, sorry.', req.body);
                }
                if (req.access_token.user != channel.admin_id) {
                    return res.forbidden('You are not the admin');
                }


                channel.members.remove(channel.id);

                sails.log('destroyed channel id:', req.params.id);
                channel.destroy();
            })

        return res.ok();
    },


    getMembers: (req, res) => {
        Channel.findOne(req.params.id).populate('members')
            .exec((err, channel) => {
                if (err) return res.serverError(err)
                else if (!channel) return res.notFound('cannot find');

                return res.ok(channel.members);
            })
    },

    joinChannel: (req, res) => {
        User.find(req.access_token.user).limit(1)
            .exec((err, u) => {
                if (err) return res.serverError(err)
                else if (!u) return res.notFound('cannot find');

                if (!req.body.name) return res.serverError('missing parameter: name');

                u = u[0];

                Channel.findOne(req.params.id)
                    .exec((err, channel) => {
                        if (err) { return res.serverError(err); }
                        if (!channel) return res.notFound();


                        channel.members.add(u.id);
                        channel.save();
                        sails.log('user ' + u.username + ' joined channel:', channel.name);

                        u.channels.add(channel.id);
                        u.save();

                        return res.ok(channel);
                    });
            });
    }

};