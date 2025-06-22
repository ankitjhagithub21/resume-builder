
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    profilePhoto: {
        url: {
            type: String,
        }
    },

    title: {
        type: String,
        required: true,
    },

    contact: {
        email: { type: String, required: true },
        phone: { type: String },
        address: { type: String },
        linkedin: { type: String },
        github: { type: String },
        website: { type: String },
    },

    summary: {
        type: String,
    },

    skills: [
        {
            name: { type: String },
            level: { type: String }, // beginner, intermediate, expert
        },
    ],

    education: [
        {
            institution: { type: String, required: true },
            degree: { type: String },
            fieldOfStudy: { type: String },
            startYear: { type: Number },
            endYear: { type: Number },
        },
    ],

    experience: [
        {
            company: { type: String, required: true },
            position: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            description: { type: String },
        },
    ],
    projects: [
        {
            name: { type: String, required: true },
            description: { type: String },
            techStack: [String],
            link: { type: String },

        },
    ],

    certificates: [
        {
            title: String,
            issuer: String,
            year: String,
            link: { type: String },
        },
    ],

    languages: [
        {
            name: { type: String },
            level: { type: String }, // beginner, intermediate, expert
        },
    ],

    interests: [String],

}, { versionKey: false, timestamps: true });

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume
