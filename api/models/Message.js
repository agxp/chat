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
            type: 'integer',
            required: true
        },

        author: {
            type: 'integer',
            required: true
        },

        content: {
            type: 'string',
            required: true
        },

        mention_everyone: {
            type: 'boolean',
            defaultsTo: false,
        },

        mentions: {
            type: 'array'
        },

        attachments: {
            type: 'array'
        },

        embeds: {
            type: 'array'
        },

        reactions: {
            type: 'array'
        },

        pinned: {
            type: 'boolean',
            defaultsTo: false
        }

    }
};