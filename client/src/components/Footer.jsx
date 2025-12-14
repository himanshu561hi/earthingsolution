import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import {
  FaArrowUp,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const catRes = await axios.get(API_URL + "/api/categories");
        setCategories(catRes.data.reverse().slice(0, 8));

        const prodRes = await axios.get(API_URL + "/api/products/popular");
        setPopularProducts(prodRes.data.reverse().slice(0, 8));
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooterData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Fixed Links Mapping ---
  const companyLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blogs" }, // Home page ke blog section par le jayega
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacypolicy" }, // Placeholder
    { name: "Terms & Conditions", path: "/terms-conditions" }, // Placeholder
    { name: "Our Presence", path: "/our-presence" }, // Placeholder
  ];

  return (
    <footer className="w-full bg-white pt-16 pb-6 border-t border-gray-200 font-sans text-gray-700 mt-auto">
      <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* --- COLUMN 1: Company Info & Social Media --- */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                VTR
              </div>
              <div>
                <h2 className="text-blue-900 font-bold text-lg leading-tight">
                  VTR INFOTECH PVT LTD
                </h2>
                <p className="text-[10px] text-gray-500 tracking-widest uppercase font-semibold">
                  - YOUR SAFETY PARTNER -
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-600 text-justify">
              VTR Infotech Private Limited, are known as a reliable
              manufacturer, supplier, and trader of electrical safety products.
            </p>

            <div className="text-sm space-y-3">
              <p>
                <span className="font-bold text-gray-900">Address:</span>{" "}
                Ghaziabad - 201010, UP, India
              </p>
              <p>
                <span className="font-bold text-gray-900">Call Us:</span>{" "}
                +91-7011874794
              </p>
              <p>
                <span className="font-bold text-gray-900">Email:</span>{" "}
                sales@vtrinfotech.com
              </p>
            </div>

            {/* Social Icons */}
            <div>
              <h4 className="font-bold text-black text-sm mb-3">
                Connect With Us:
              </h4>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <FaFacebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition-all duration-300"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-all duration-300"
                >
                  <FaWhatsapp size={20} />
                </a>
                <a
                  href="mailto:sales@vtrinfotech.com"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <FaEnvelope size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* --- COLUMN 2: Company Links (FIXED) --- */}
          <div>
            <h3 className="text-xl font-bold text-black mb-6">Pages</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-600">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  {/* Agar internal link hai (Start with /) to Link use karein, nahi to 'a' tag */}
                  {item.path.startsWith("/") ? (
                    <Link
                      to={item.path}
                      className="hover:text-blue-900 hover:translate-x-1 transition-all inline-block"
                      onClick={scrollToTop} // Page change hone par top par scroll kare
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.path}
                      className="hover:text-blue-900 hover:translate-x-1 transition-all inline-block"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* --- COLUMN 3: Our Category (Using Link now) --- */}
          <div>
            <h3 className="text-xl font-bold text-black mb-6">Our Category</h3>
            {categories.length > 0 ? (
              <ul className="space-y-3 text-sm font-medium text-gray-600">
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link
                      to={`/category/${cat._id}`}
                      className="hover:text-blue-900 hover:translate-x-1 transition-all inline-block"
                      onClick={scrollToTop}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">
                Loading categories...
              </p>
            )}
          </div>

          {/* --- COLUMN 4: Our Products (Using Link now) --- */}
          <div>
            <h3 className="text-xl font-bold text-black mb-6">Our Products</h3>
            {popularProducts.length > 0 ? (
              <ul className="space-y-3 text-sm font-medium text-gray-600">
                {popularProducts.map((prod) => (
                  <li key={prod._id}>
                    <Link
                      to={`/product/${prod._id}`}
                      className="hover:text-blue-900 hover:translate-x-1 transition-all inline-block"
                      onClick={scrollToTop}
                    >
                      {prod.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">
                Loading popular items...
              </p>
            )}
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-gray-300 mt-16 pt-8 pb-4 relative">
          <div className="absolute left-0 -top-5 hidden md:block">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-white border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-sm"
            >
              <FaArrowUp className="text-gray-700 text-sm" />
            </button>
          </div>
          <div className="text-xs text-center text-gray-500 space-y-1">
            <p>
              Copyright © 2023-2025 VTR Infotech Pvt. Ltd. | All Rights Reserved
            </p>
            <p>
              Website Design, Developed by{" "}
              <a href="#" className="text-red-500 font-bold hover:underline">
                Himanshu Gupta
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
