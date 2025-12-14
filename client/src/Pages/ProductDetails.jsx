import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const ProductDetails = () => {
  const { id } = useParams(); // URL se ID nikalne ke liye
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State: User ka data store karne ke liye
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Loading state for form submission
  const [submitting, setSubmitting] = useState(false);

  // 1. Product Fetch karna
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(API_URL + `/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // 2. Input Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        productId: product._id,
      };

      await axios.post(API_URL + "/api/enquiry", payload);

      alert(
        "Thank you! Your enquiry has been sent. We will contact you shortly."
      );

      setFormData({
        customerName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending enquiry:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div className="text-center py-20 text-xl">Loading Details...</div>;
  if (!product)
    return (
      <div className="text-center py-20 text-xl text-red-500">
        Product Not Found
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          Home / {product.category} /{" "}
          <span className="text-gray-800 font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* --- LEFT COLUMN: Product Image & Info --- */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="h-80 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Basic Details */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h1>
                  <p className="text-blue-900 font-semibold text-lg mb-6">
                    {product.category}
                  </p>

                  {/* --- PRICE SECTION REMOVED HERE --- */}

                  <button
                    onClick={() =>
                      document
                        .getElementById("enquiryForm")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                    className="bg-blue-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 transition shadow-lg"
                  >
                    Get Latest Price
                  </button>

                  <div className="mt-6 text-sm text-gray-500">
                    <p>
                      Availability:{" "}
                      <span className="text-green-600 font-bold">In Stock</span>
                    </p>
                    <p>
                      Delivery: <span className="text-gray-800">1-2 Days</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Tabs Section */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Product Description
              </h3>
              <div className="text-gray-600 leading-relaxed space-y-4">
                {product.description ||
                  "No description available for this product."}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Request Quote Form --- */}
          <div className="lg:col-span-1">
            <div
              id="enquiryForm"
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 sticky top-10"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Request A Quote
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Fill the form to get the best price for{" "}
                <strong>{product.name}</strong> instantly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-900"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-900"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  required
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-900"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Message / Requirements"
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-900"
                ></textarea>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full text-white font-bold py-3 rounded transition ${
                    submitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-900 hover:bg-blue-800"
                  }`}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>

              {/* Contact Info Widget */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-bold text-gray-800 mb-2">Contact Info</h4>
                <p className="text-sm text-gray-600 mb-1">📞 +91-7011874794</p>
                <p className="text-sm text-gray-600">
                  📧 sales@vtrinfotech.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
