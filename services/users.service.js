"use strict";

const bcrypt = require("bcrypt");
const hat = require("hat");
const DBMixin = require('../mixins/db.mixin');
const AuthenticationMixin = require('../mixins/authentication.mixin');
const User = require('../models/user');

module.exports = {
	name: "users",
	mixins: [DBMixin("users"), AuthenticationMixin],
    model: User,

	settings: {
        fields: ["_id", "email", "firstName", "lastName", "bio"],
        entityValidator: {
            email: { type: "email" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            password: { type: "string" },
            bio: { type: "string", optional: true }
        }
    },

    actions: {
        count: false,
        remove: false,
        insert: false,
        find: false,

        /**
         * Registrate user with given params
         * @param {Object} user - User params
         * @returns {Object} - Saved and authenticated user 
         */
        create: {
            auth: false,
            params: {
                user: {
                    type: "object"
                },
                deviceId: {
                    type: "string"
                }
            },
            async handler(ctx) {
                const user = new User(ctx.params.user);
                await this.validateEntity(user);
                user.password = bcrypt.hashSync(user.password, 10);
                user.apiKeys.push({
                    token: hat(256),
                    deviceId: ctx.params.deviceId
                });
                try {
                    await user.save();
                } catch (error) {
                    // TODO handle mongo errors
                    console.error(error);
                }
                const response = await this.transformDocuments(ctx, {}, user)
                response.apiKeys = user.apiKeys
                return response
            }
        },

        /**
         * Get current user for API key
         * @returns - Logged in user
         */
        me: {
            rest: "GET /me",
            async handler(ctx) {
                return this.transformDocuments(ctx, {}, ctx.meta.user)
            }
        }
    },

	methods: {

    }
};
