const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, default: "Admin" }, // e.g., VRD Creative
    date: { type: String, required: true }, // e.g., "14 November 2025"
    content: { type: String, required: true }, // Full blog content
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);