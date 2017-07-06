/**
 * ChannelController
 *
 * @description :: Server-side logic for managing channels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var GENERAL_CHANNEL_ID = null;
var GENERAL_CHANNEL = () => {
  if (GENERAL_CHANNEL_ID) return GENERAL_CHANNEL_ID;
  sails.log("getting general channel ID");
  User.findOne({
    email: "admin"
  }).populate("channels").then(channel => {
    sails.log("GENERAL_CHANNEL_ID:", channel.id);
    GENERAL_CHANNEL_ID = channel.id;
    return channel.id;
  });
};

module.exports = {
  getChannel: async(function (req, res) {
    if (!GENERAL_CHANNEL_ID) {
      GENERAL_CHANNEL_ID = await (Channel.find()
        .sort("id ASC")
        .limit(1)
        .then((c) => {
          sails.log(c[0].id)
          return c[0].id;
        }));
    }

    var id = req.params.id === "@me" ? GENERAL_CHANNEL_ID : req.params.id;
    Channel.findOne(id).populate("members").exec((err, channel) => {
      if (err) {
        return res.serverError(err);
      }
      if (!channel) {
        return res.notFound("Could not find channel, sorry.", req.body);
      }

      sails.log('Found channel: "%s"', channel.name);
      return res.ok(channel);
    });
  }),

  createChannel: (req, res) => {
    User.find(req.access_token.user).limit(1).exec((err, u) => {
      if (err) return res.serverError(err);
      else if (!u) return res.notFound("cannot find");

      if (!req.body.name) return res.serverError("missing parameter: name");

      u = u[0];

      Channel.create({
        name: req.body.name,
        admin_id: u.id
      }).exec(function (err, channel) {
        if (err) {
          return res.serverError(err);
        }

        if (req.body.topic) channel.topic = req.body.topic;
        if (req.body.icon) channel.icon = req.body.icon;

        if (u.email === "admin") GENERAL_CHANNEL_ID = channel.id;

        channel.members.add(u.id);
        channel.save();
        sails.log("created channel:", channel.name);
        sails.log("GENERAL_CHANNEL_ID", GENERAL_CHANNEL());

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
      }).then((message) => {
        if (err) return res.serverError(err);

        message.author.add(req.access_token.user);

        User.find(req.access_token.user).limit(1)
          .populate("messages")
          .then((u) => {
            if (err) sails.log(err);
            u = u[0];
            sails.log(u);
            u.messages.add(message.id);
            u.save();
          });

        if (req.body.mention_everyone) message.mention_everyone = true;
        if (req.body.mentions); // TODO handleMentions()
        if (req.body.attachments); // TODO handleAttachments()
        if (req.body.embeds); // TODO handleEmbeds()

        message.save(err => {
              Message.find({
      channel_id: message.channel_id
    })
      .populateAll()
      .sort("id DESC")
      .limit(50)
      .exec((err, populated) => {
        if (err) return res.serverError(err);
        else if (!populated) return res.notFound("cannot find");

        // if (!messages[0].author)
        sails.log("MESSAGE:", JSON.stringify(populated[0].author));

        Channel.message(message.channel_id, populated);
      }); 
          sails.log("Message created with user ", message)
        });

        channel.last_message_id = message.id;
        channel.save();
        sails.log(
          "message created in channel " + channel.id + ": ",
          message.content
        );



        return res.ok(message);
      });
    })
  },

  editMessage: (req, res) => {
    Message.findOne(req.params.message_id)
      .populate("author")
      .exec((err, message) => {
        if (err) return res.serverError(err);
        if (!message) return res.notFound("couldnt find message");

        if (message.author.id != req.access_token.user.id)
          return res.forbidden();

        if (!req.body.content) return res.badRequest("missing content");

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
        if (err) return res.serverError(err);
        if (!message) return res.notFound("couldnt find message");

        if (message.author.id != req.access_token.user.id)
          return res.forbidden();

        message.destroy();

        sails.log(
          "message deleted in channel " + req.params.id + ": ",
          message.id
        );
        return res.ok(message);
      });
  },

  streamMessages: function (req, res) {

    if (!req.isSocket) {
      return res.badRequest('Only a client socket can subscribe to messages.  You, sir or madame, appear to be an HTTP request.');
    }

    // Let's say our client socket has a problem with people named "louie".

    // First we'll find all users named "louie" (or "louis" even-- we should be thorough)
    Channel.find().exec(function (err, channels) {
      if (err) {
        return res.serverError(err);
      }

      sails.sockets.join(req, 'funSockets');

      // Broadcast a notification to all the sockets who have joined
      // the "funSockets" room, excluding our newly added socket:
      sails.sockets.broadcast('funSockets', 'message', {
        hi: 'hi there!'
      });


      // Now we'll use the ids we found to subscribe our client socket to each of these records.
      Channel.subscribe(req, _.pluck(channels, 'id'));

      // Now any time a user named "louie" or "louis" is modified or destroyed, our client socket
      // will receive a notification (as long as it stays connected anyways).

      // All done!  We could send down some data, but instead we send an empty response.
      // (although we're ok telling this vengeful client socket when our users get
      //  destroyed, it seems ill-advised to send him our Louies' sensitive user data.
      //  We don't want to help this guy to hunt them down in real life.)
      return res.ok("sucessfully ok'd");


    })
  }
}