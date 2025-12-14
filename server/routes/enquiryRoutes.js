const express = require('express');
const router = express.Router();
// Apne controller ka path sahi rakhein
const { createEnquiry, getAllEnquiries } = require('../controllers/enquiryController');

// Jab koi '/' par POST karega (matlab /api/enquiry/), to createEnquiry chalega
router.post('/', createEnquiry); 

// Jab koi '/' par GET karega, to list aayegi (Admin ke liye)
router.get('/', getAllEnquiries);

module.exports = router;