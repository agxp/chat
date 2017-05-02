/**
 * Channel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,
    autoPK: true,

    attributes: {
        name: {
            type: 'string',
            required: true
        },

        admin_id: {
            type: 'integer',
            required: true
        },

        member_count: {
            type: 'integer',
            defaultsTo: 1,
            required: true
        },

        topic: {
            type: 'string',
            defaultsTo: 'my awesome channel',
        },

        last_message_id: {
            type: 'integer',
            defaultsTo: -1,
            required: true
        },

        is_private: {
            type: 'boolean',
            defaultsTo: false,
            required: true
        },

        members: {
            type: 'array',
            required: true
        }
    }
};