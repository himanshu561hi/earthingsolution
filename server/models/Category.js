const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "Lightning Protection"
    image: { type: String, required: true }, // Image URL
    description: { type: String } // Optional short text
});

module.exports = mongoose.model('Category', CategorySchema);