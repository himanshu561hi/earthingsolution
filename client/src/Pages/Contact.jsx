import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  // Form State
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Status State: null, 'sending', 'success', 'error'
  const [status, setStatus] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // YAHAN CHANGE KAREIN 👇
      await axios.post(API_URL + "/api/general-enquiry", formData);

      setStatus("success");
      setFormData({ customerName: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      <div className="relative bg-blue-900 py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 lg:px-12 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Have a question or need a custom quote? We are here to help. Reach
            out to our expert team for earthing and safety solutions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* --- LEFT SIDE: CONTACT INFO --- */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you have an inquiry about our products, pricing, or need
                technical assistance, our team is ready to answer all your
                questions.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center text-xl shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">
                    Our Office
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Plot No. 123, Industrial Area, <br />
                    Sector 62, Noida, Uttar Pradesh - 201301
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xl shrink-0">
                  📞
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">
                    Phone Number
                  </h4>
                  <p className="text-gray-600 text-sm mb-1">+91 98765 43210</p>
                  <p className="text-gray-600 text-sm">+91 12345 67890</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-xl shrink-0">
                  ✉️
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">
                    Email Address
                  </h4>
                  <p className="text-gray-600 text-sm">info@vtrinfotech.com</p>
                  <p className="text-gray-600 text-sm">sales@vtrinfotech.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTACT FORM --- */}
          <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-900 to-blue-500"></div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 ..."
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="How can we help you?"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-blue-900 text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm text-center font-medium mt-4 border border-green-200">
                  ✅ Message sent successfully! We will contact you soon.
                </div>
              )}
              {status === "error" && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center font-medium mt-4 border border-red-200">
                  ❌ Server Error.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* --- MAP SECTION --- */}
      <div className="w-full h-96 bg-gray-200 mt-8">
        <iframe
          title="Google Map"
          src="https://maps.google.com/maps?q=Noida%20Sector%2062&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="filter grayscale hover:grayscale-0 transition duration-500"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
