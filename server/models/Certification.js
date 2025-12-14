const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String, // Logo/Image URL
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Certification', certificationSchema);