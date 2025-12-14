const mongoose = require('mongoose');

const generalEnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },     // Customer Name
  email: { type: String, required: true },    // Email
  phone: { type: String, required: true },    // Phone Number
  subject: { type: String, default: "General Inquiry" }, // Optional Subject
  message: { type: String, required: true },  // Message
  status: { type: String, default: "New" },   // New, Read, Contacted
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GeneralEnquiry', generalEnquirySchema);