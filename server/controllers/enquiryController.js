const Enquiry = require('../models/Enquiry'); // Aapka wala schema import kiya

// 1. User ke liye: Enquiry Save karna
exports.createEnquiry = async (req, res) => {
  try {
    // req.body me frontend se { customerName, email, phone, message, productId } aayega
    const newEnquiry = new Enquiry(req.body);
    await newEnquiry.save();
    
    res.status(201).json({ success: true, message: "Enquiry sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Admin ke liye: Enquiry List dikhana (With Product Details)
exports.getAllEnquiries = async (req, res) => {
  try {
    // .populate('productId') ka matlab: ID hatao aur pura Product object le aao
    const enquiries = await Enquiry.find()
      .populate('productId') 
      .sort({ createdAt: -1 }); // Latest sabse upar

    res.status(200).json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};