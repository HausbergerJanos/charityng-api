"use strict";
const DBMxin = require('../mixins/db.mixin')
const AdminUser = require('../models/adminUser');

module.exports = {
	name: "admin.users",
	mixins: [DBMxin("adminUsers")],
    model: AdminUser,

	settings: {

    },

    actions: {
        count: false,
        remove: false,
        insert: false,
        find: false,
    },

	methods: {

    }
};
