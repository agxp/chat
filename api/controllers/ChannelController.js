/**
 * ChannelController
 *
 * @description :: Server-side logic for managing channels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let GENERAL_CHANNEL_ID;
module.exports = {
  GENERAL_CHANNEL_ID: GENERAL_CHANNEL_ID,

  getChannel: (req, res) => {
    Channel.findOne(req.params.id).exec((err, channel) => {
      if (err) {
        return res.serverError(err);
      }
      if (!channel) {
        return res.notFound("Could not find channel, sorry.", req.body);
      }

      sails.log('Found channel: "%s"', channel.name);
      return res.ok(channel);
    });
  },

  createChannel: (req, res) => {
    User.find(req.access_token.user).limit(1).exec((err, u) => {
      if (err) return res.serverError(err);
      else if (!u) return res.notFound("cannot find");

      if (!req.body.name) return res.serverError("missing parameter: name");

      u = u[0];

      Channel.create({
        name: req.body.name,
        admin_id: u.id
      }).exec(function(err, channel) {
        if (err) {
          return res.serverError(err);
        }

        if (req.body.topic) channel.topic = req.body.topic;
        if (req.body.icon) channel.icon = req.body.icon;

        if (u.email === "admin") GENERAL_CHANNEL_ID = channel.id;

        channel.members.add(u.id);
        channel.save();
        sails.log("created channel:", channel.name);
        sails.log("GENERAL_CHANNEL_ID", GENERAL_CHANNEL_ID);

        u.channels.add(channel.id);
        u.save();

        return res.ok(channel);
      });
    });
  },

  editChannel: (req, res) => {
    Channel.findOne(req.params.id).exec((err, channel) => {
      if (err) {
        return res.serverError(err);
      }
      if (!channel) {
        return res.notFound("Could not find channel, sorry.", req.body);
      }
      if (req.access_token.user != channel.admin_id) {
        return res.forbidden("You are not the admin");
      }

      if (req.body.name) channel.name = req.body.name;
      if (req.body.topic) channel.topic = req.body.topic;
      if (req.body.icon) channel.icon = req.body.icon;

      channel.save();
      sails.log("edited channel:", channel.name);

      return res.ok(channel);
    });
  },

  deleteChannel: (req, res) => {
    Channel.findOne(req.params.id).populate("members").exec((err, channel) => {
      if (err) {
        return res.serverError(err);
      }
      if (!channel) {
        return res.notFound("Could not find channel, sorry.", req.body);
      }
      if (req.access_token.user != channel.admin_id) {
        return res.forbidden("You are not the admin");
      }

      channel.members.remove(channel.id);

      sails.log("destroyed channel id:", req.params.id);
      channel.destroy();
    });

    return res.ok();
  },

  getMembers: (req, res) => {
    Channel.findOne(req.params.id).populate("members").exec((err, channel) => {
      if (err) return res.serverError(err);
      else if (!channel) return res.notFound("cannot find");

      return res.ok(channel.members);
    });
  },

  joinChannel: (req, res) => {
    User.find(req.access_token.user).limit(1).exec((err, u) => {
      if (err) return res.serverError(err);
      else if (!u) return res.notFound("cannot find");

      u = u[0];
      Channel.findOne(req.params.id).exec((err, channel) => {
        if (err) {
          return res.serverError(err);
        }
        if (!channel) return res.notFound();

        channel.members.add(u.id);
        channel.member_count++;
        channel.save();

        sails.log("user " + u.username + " joined channel:", channel.name);

        u.channels.add(channel.id);
        u.save();

        return res.ok(channel);
      });
    });
  },

  leaveChannel: (req, res) => {
    User.find(req.access_token.user)
      .limit(1)
      .populate("channels")
      .exec((err, u) => {
        if (err) return res.serverError(err);
        else if (!u) return res.notFound("cannot find");

        u = u[0];
        Channel.findOne(req.params.id)
          .populate("members")
          .exec((err, channel) => {
            if (err) {
              return res.serverError(err);
            }
            if (!channel) return res.notFound();

            channel.members.remove(u.id);
            channel.member_count--;
            channel.save();
            sails.log("user " + u.username + " left channel:", channel.name);

            u.channels.remove(channel.id);
            u.save();

            return res.ok();
          });
      });
  },

  postMessage: (req, res) => {
    Channel.findOne(req.params.id).exec((err, channel) => {
      if (err) {
        return res.serverError(err);
      }
      if (!channel) {
        return res.notFound("Could not find channel, sorry.", req.body);
      }

      Message.create({
        channel_id: req.params.id,
        content: req.body.content
      }).exec((err, message) => {
        if (err) return sails.serverError(err);

        message.author.add(req.access_token.user);

        User.findOne(req.access_token.user)
          .populate("messages")
          .exec((err, u) => {
            u.messages.add(message.id);
            u.save();
          });

        if (req.body.mention_everyone) message.mention_everyone = true;
        if (req.body.mentions); // TODO handleMentions()
        if (req.body.attachments); // TODO handleAttachments()
        if (req.body.embeds); // TODO handleEmbeds()
        message.save();

        channel.last_message_id = message.id;
        channel.save();
        sails.log(
          "message created in channel " + channel.id + ": ",
          message.content
        );
        return res.ok(message);
      });
    });
  },

  editMessage: (req, res) => {
    Message.findOne(req.params.message_id)
      .populate("author")
      .exec((err, message) => {
        if (err) return sails.serverError(err);
        if (!message) return sails.notFound("couldnt find message");

        if (message.author.id != req.access_token.user)
          return sails.forbidden();

        if (!req.body.content) return sails.badRequest("missing content");

        message.content = req.body.content;

        if (req.body.mentions); // TODO handleMentions()
        if (req.body.attachments); // TODO handleAttachments()
        if (req.body.embeds); // TODO handleEmbeds()

        message.save();

        sails.log(
          "message edited in channel " + req.params.id + ": ",
          message.id
        );
        return res.ok(message);
      });
  },

  getMessages: (req, res) => {
    // brute force, will fix later
    Message.find({
      channel_id: req.params.id
    })
      .populate("author")
      .sort("id DESC")
      .limit(50)
      .exec((err, messages) => {
        if (err) return res.serverError(err);
        else if (!messages) return res.notFound("cannot find");

        return res.ok(messages);
      });
  },

  deleteMessage: (req, res) => {
    Message.findOne(req.params.message_id)
      .populate("author")
      .exec((err, message) => {
        if (err) return sails.serverError(err);
        if (!message) return sails.notFound("couldnt find message");

        if (message.author.id != req.access_token.user)
          return sails.forbidden();

        message.destroy();

        sails.log(
          "message deleted in channel " + req.params.id + ": ",
          message.id
        );
        return res.ok(message);
      });
  }
};
