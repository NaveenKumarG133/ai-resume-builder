const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, default: 'Untitled Resume' },
    personal: {
        fullName: String,
        email: String,
        phone: String,
        location: String,
        portfolio: String
    },
    summary: String,
    experience: [{
        company: String,
        role: String,
        duration: String,
        description: String
    }],
    education: [{
        school: String,
        degree: String,
        year: String
    }],
    skills: [String],
    template: { type: String, default: 'modern' },
    status: { type: String, enum: ['Draft', 'Completed'], default: 'Draft' }
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
