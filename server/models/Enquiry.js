const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }, 
  message: String,

  // --- YE FIELD MISSING THI, ISE ADD KAREIN ---
  status: { 
    type: String, 
    default: 'pending', // Default value 'pending' rahegi
    enum: ['pending', 'contacted', 'closed'] // Sirf ye 3 values allowed hain
  },
  // ---------------------------------------------

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', enquirySchema);