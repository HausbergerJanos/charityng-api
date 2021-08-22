const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = Schema({
    address: { type: String },
    phone: { type: String },
    email: { type: String }
})

const ThemeColorsSchema = Schema({
    primary: { type: String, default: "e64a19" },
    secondary: { type: String, default: "ff7d47" }
})

const OrganizationSchema = Schema({
    name: { type: String, default: "Charityng" },
    logoUrl: { type: String, default: "/organizationDefault.png" },
    contact: { type: ContactSchema },
    introduction: { type: String, default: "This is an exaple organization" },
    colors: { type: ThemeColorsSchema, default: () => ({}) } 
}, {
    timestamps: true
});

module.exports = mongoose.model("Organization", OrganizationSchema);