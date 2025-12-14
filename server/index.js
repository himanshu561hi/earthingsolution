
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

// Models Import
const Category = require('./models/Category');
const Product = require('./models/Product');
const Blog = require('./models/Blog');
const Admin = require('./models/Admin'); 
const Enquiry = require('./models/Enquiry');
const Client = require('./models/Client'); 
const Certification = require('./models/Certification'); // <--- NEW IMPORT
const GeneralEnquiry = require('./models/GeneralEnquiry');





const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));



sgMail.setApiKey(process.env.SENDGRID_API_KEY);



// --- 1. FORGOT PASSWORD (SEND OTP via SENDGRID) ---
app.post('/api/admin/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin email not found" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to DB
    admin.resetOtp = otp;
    admin.resetOtpExpire = Date.now() + 10 * 60 * 1000; // 10 Minutes
    await admin.save();

    // --- SENDGRID EMAIL LOGIC ---
    const msg = {
      to: admin.email, // User ka email
      from: process.env.SENDGRID_EMAIL_FROM, // Aapka Verified Sender Email (.env se)
      subject: 'Password Reset OTP - VTR Infotech',
      text: `Your OTP for password reset is: ${otp}`, // Plain text version
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>You requested a password reset for VTR Infotech Admin Panel.</p>
          <h1 style="color: #1e3a8a; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    console.log(`OTP sent via SendGrid to: ${admin.email}`);

    res.json({ message: "OTP sent to your Email!" });

  } catch (error) {
    console.error("SendGrid Error:", error);

    // Agar error aaye to detail check karein
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).json({ error: "Failed to send OTP email" });
  }
});

// --- ADMIN AUTH ROUTES ---


// 1. Admin Signup
// --- REGISTER NEW ADMIN API ---
app.post('/api/admin/register', async (req, res) => {
  try {
    // Yahan hume 4 cheezein chahiye, pehle shayad sirf username/password tha
    const { username, email, phone, password } = req.body;

    // Check karein ki saari values aayi hain ya nahi
    if (!username || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields (username, email, phone, password) are required" });
    }

    // Check if Email Already Exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Naya Admin Object banayein
    const newAdmin = new Admin({
      username,
      email,   // <-- Ye zaroori hai
      phone,   // <-- Ye zaroori hai
      password // Note: Real app me isko hash karke save karein
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin Registered Successfully!" });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Registration Failed", details: error.message });
  }
});

// --- 2. RESET PASSWORD (DEBUG VERSION) ---
app.post('/api/admin/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    console.log("----- DEBUG START -----");
    console.log("1. Frontend se aaya data:", { email, otp, newPassword });

    // Step 1: Sirf Email se user dhoondo (OTP mat check karo abhi)
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      console.log("❌ Error: Admin email database mein nahi mila.");
      return res.status(404).json({ error: "Email not found" });
    }

    console.log("2. Database mein saved data:", {
      savedEmail: admin.email,
      savedOTP: admin.resetOtp,
      expireTime: admin.resetOtpExpire,
      currentTime: new Date()
    });

    // Step 2: Check OTP Match (String convert karke aur space hata ke)
    // Trim() extra spaces hata deta hai
    const isOtpMatch = admin.resetOtp.toString().trim() === otp.toString().trim();
    
    if (!isOtpMatch) {
      console.log(`❌ Error: OTP Mismatch! DB: '${admin.resetOtp}' vs User: '${otp}'`);
      return res.status(400).json({ error: "Invalid OTP (Does not match)" });
    }

    // Step 3: Check Expiry
    const isExpired = admin.resetOtpExpire < Date.now();
    
    if (isExpired) {
      console.log("❌ Error: OTP Expired ho chuka hai.");
      return res.status(400).json({ error: "OTP Expired" });
    }

    // --- AGAR SAB SAHI HAI TO PASSWORD UPDATE KAREIN ---
    console.log("✅ Success: Sab match ho gaya. Password updating...");
    
    admin.password = newPassword; 
    admin.resetOtp = undefined;
    admin.resetOtpExpire = undefined;

    await admin.save();
    res.json({ message: "Password updated successfully!" });
    console.log("----- DEBUG END -----");

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
});


// 2. Admin Login
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        
        if (!admin || admin.password !== password) {
            return res.status(400).json({ message: "Wrong Credentials!" });
        }
        res.json({ message: "Login Successful", username: admin.username });
    } catch (err) { res.status(500).json(err); }
});

// --- CONTENT ROUTES ---

// CATEGORY ROUTES
app.post('/api/categories', async (req, res) => {
    try {
        const newCat = new Category(req.body);
        const savedCat = await newCat.save();
        res.status(201).json(savedCat);
    } catch (err) { res.status(500).json(err); }
});

app.get('/api/categories', async (req, res) => {
    try { const cats = await Category.find(); res.json(cats); } 
    catch (err) { res.status(500).json(err); }
});

app.delete('/api/categories/:id', async (req, res) => {
    try { await Category.findByIdAndDelete(req.params.id); res.json("Category Deleted"); }
    catch (err) { res.status(500).json(err); }
});


// --- PRODUCT ROUTES ---

// 1. Create Product
app.post('/api/products', async (req, res) => {
    try {
        const newProd = new Product(req.body);
        const savedProd = await newProd.save();
        res.status(201).json(savedProd);
    } catch (err) { res.status(500).json(err); }
});

// 2. Get All Products
app.get('/api/products', async (req, res) => {
    try { const prods = await Product.find(); res.json(prods); } 
    catch (err) { res.status(500).json(err); }
});

// 3. Get Popular Products
app.get('/api/products/popular', async (req, res) => {
  try {
    const popularProducts = await Product.find({ isPopular: true });
    res.json(popularProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get Single Product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Product not found or Server Error" });
  }
});

// 5. Delete Product
app.delete('/api/products/:id', async (req, res) => {
    try { await Product.findByIdAndDelete(req.params.id); res.json("Product Deleted"); }
    catch (err) { res.status(500).json(err); }
});


// --- ENQUIRY ROUTES ---

// 1. Create Enquiry
app.post('/api/enquiry', async (req, res) => {
    try {
        const newEnquiry = new Enquiry({ ...req.body, status: 'pending' });
        const savedEnquiry = await newEnquiry.save();
        res.status(201).json({ success: true, data: savedEnquiry });
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. Get All Enquiries
app.get('/api/admin/enquiries', async (req, res) => {
    try {
        const enquiries = await Enquiry.find()
            .populate('productId') 
            .sort({ createdAt: -1 });
        res.json({ success: true, data: enquiries });
    } catch (err) {
        res.status(500).json(err);
    }
});

// 3. Update Status
app.patch('/api/admin/enquiries/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(
            req.params.id, 
            { status: status }, 
            { new: true }
        );
        res.json({ success: true, data: updatedEnquiry });
    } catch (err) {
        res.status(500).json(err);
    }
});

// 4. Delete Enquiry
app.delete('/api/admin/enquiries/:id', async (req, res) => {
    try {
        await Enquiry.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// --- CLIENT ROUTES ---

// 1. Add Client
app.post('/api/clients', async (req, res) => {
    try {
        const newClient = new Client(req.body);
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    } catch (err) { res.status(500).json(err); }
});

// 2. Get All Clients
app.get('/api/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) { res.status(500).json(err); }
});

// 3. Delete Client
app.delete('/api/clients/:id', async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.json("Client Deleted");
    } catch (err) { res.status(500).json(err); }
});


// --- NEW: CERTIFICATION ROUTES ---

// 1. Add Certification
app.post('/api/certifications', async (req, res) => {
    try {
        const newCert = new Certification(req.body);
        const savedCert = await newCert.save();
        res.status(201).json(savedCert);
    } catch (err) { res.status(500).json(err); }
});

// 2. Get All Certifications
app.get('/api/certifications', async (req, res) => {
    try {
        const certs = await Certification.find();
        res.json(certs);
    } catch (err) { res.status(500).json(err); }
});

// 3. Delete Certification
app.delete('/api/certifications/:id', async (req, res) => {
    try {
        await Certification.findByIdAndDelete(req.params.id);
        res.json("Certification Deleted");
    } catch (err) { res.status(500).json(err); }
});


// --- BLOG ROUTES ---
app.post('/api/blogs', async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) { res.status(500).json(err); }
});

app.get('/api/blogs', async (req, res) => {
    try { const blogs = await Blog.find(); res.json(blogs); } 
    catch (err) { res.status(500).json(err); }
});

// 3. NEW: Get Single Blog by ID
app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    try { await Blog.findByIdAndDelete(req.params.id); res.json("Blog Deleted"); }
    catch (err) { res.status(500).json(err); }
});

app.get('/api/search', async (req, res) => {
    try {
        const { q } = req.query; // ?q=something
        if (!q) return res.json({ products: [], blogs: [] });

        // 'i' means case-insensitive (chhota bada letter same maana jayega)
        const regex = new RegExp(q, 'i');

        // 1. Search in Products (Name or Category)
        const products = await Product.find({
            $or: [{ name: regex }, { category: regex }]
        });

        // 2. Search in Blogs (Title)
        const blogs = await Blog.find({ title: regex });

        res.json({ products, blogs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 1. POST: Save General Enquiry
app.post('/api/general-enquiry', async (req, res) => {
    try {
        const { customerName, email, phone, message } = req.body;
        // Frontend se 'customerName' aa raha hai, model mein 'name' hai map kar lein
        const newEnquiry = new GeneralEnquiry({
            name: customerName,
            email,
            phone,
            message
        });
        await newEnquiry.save();
        res.status(201).json({ message: "General Enquiry Submitted!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to submit" });
    }
});

// 2. GET: Admin ke liye saari General Enquiries
app.get('/api/admin/general-enquiries', async (req, res) => {
    try {
        const data = await GeneralEnquiry.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch" });
    }
});

// 3. DELETE: General Enquiry Delete karna
app.delete('/api/admin/general-enquiries/:id', async (req, res) => {
    try {
        await GeneralEnquiry.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting" });
    }
});

// 4. PATCH: General Enquiry Status Update
app.patch('/api/admin/general-enquiries/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        await GeneralEnquiry.findByIdAndUpdate(req.params.id, { status });
        res.json({ message: "Status updated" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update status" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});