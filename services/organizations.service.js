"use strict";

const DBMixin = require('../mixins/db.mixin');
const Organization = require('../models/organization');
const { } = require('moleculer').Errors

module.exports = {
	name: "organizations",
	mixins: [DBMixin("organizations")],
    model: Organization,

	settings: {
    },

    actions: {
        count: false,
        remove: false,
        insert: false,
        find: false,
        create: false,

        /**
         * write comments
         */
        initializeDefault: {
            async handler(ctx) {
                const count = await this.adapter.count();
                if (count > 0) {
                    console.warn("Organization is already initialized!")
                    return;
                }
                const organization = await this.adapter.insert({});
                return organization;
            }
        }        
    },

	methods: {
    },
};
