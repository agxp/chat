/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  autoPK: true,

  attributes: {
    channel_id: {
      type: "integer",
      required: true
    },

    author: {
      collection: "user",
      via: "messages"
    },

    content: {
      type: "string",
      required: true
    },

    mention_everyone: {
      type: "boolean",
      defaultsTo: false
    },

    mentions: {
      type: "array"
    },

    attachments: {
      type: "array"
    },

    embeds: {
      type: "array"
    },

    reactions: {
      type: "array"
    },

    pinned: {
      type: "boolean",
      defaultsTo: false
    }
  }

  // afterCreate: function(message, cb) {
  //   Message.find({
  //     channel_id: message.channel_id
  //   })
  //     .populateAll()
  //     .sort("id DESC")
  //     .limit(50)
  //     .exec((err, populated) => {
  //       if (err) return res.serverError(err);
  //       else if (!populated) return res.notFound("cannot find");

  //       // if (!messages[0].author)
  //       sails.log("MESSAGE:", JSON.stringify(populated[0].author));

  //       Channel.message(message.channel_id, populated);
  //       cb();
  //     });
  // }
};
