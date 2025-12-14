import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // useLocation hata diya kyunki ab zaroorat nahi
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(API_URL + "/api/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // --- SEARCH LOGIC ---
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsMobileMenuOpen(false);
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <nav className="bg-white shadow-md relative z-50 font-sans">
      <div className="flex justify-between items-center px-4 md:px-8 py-4">
        {/* --- Logo --- */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
            V
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900 leading-tight">
              VTR INFOTECH
            </h1>
            <p className="text-xs text-gray-500 tracking-wide">
              YOUR SAFETY PARTNER
            </p>
          </div>
        </Link>

        {/* --- Desktop Menu --- */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="hidden md:flex gap-8 text-gray-700 font-medium items-center mr-4">
            <li>
              <Link
                to="/"
                className="hover:text-blue-900 transition hover:scale-105"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-900 transition hover:scale-105"
              >
                About
              </Link>
            </li>

            {/* Desktop Category Dropdown */}
            <li className="relative group cursor-pointer h-full py-2">
              <span className="hover:text-blue-900 flex items-center gap-1">
                Category
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
              <div className="absolute left-0 top-full mt-0 w-64 bg-white shadow-xl rounded-md border border-gray-100 overflow-hidden hidden group-hover:block z-50">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/category/${cat._id}`}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 border-b border-gray-50 last:border-none transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))
                ) : (
                  <span className="block px-4 py-3 text-sm text-gray-400 italic">
                    No Categories
                  </span>
                )}
              </div>
            </li>

            {/* BLOG LINK (Updated: No Scroll, Direct Link) */}
            <li>
              <Link
                to="/blogs"
                className="hover:text-blue-900 transition hover:scale-105 cursor-pointer"
              >
                Blogs
              </Link>
            </li>
          </ul>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search here..."
              className="border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 w-48 lg:w-64 transition-all"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 hover:text-blue-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>

          <Link to="/contact">
            <button className="bg-blue-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition shadow-sm hover:shadow-md">
              Contact Us
            </button>
          </Link>
        </div>

        {/* --- Mobile Hamburger --- */}
        <button
          className="md:hidden text-blue-900 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* --- Mobile Menu --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-100 px-4 pt-4 pb-6 absolute w-full shadow-lg h-screen overflow-y-auto">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:border-blue-900"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>

          <ul className="flex flex-col gap-2 text-gray-700 font-medium">
            <li className="border-b border-gray-100">
              <Link
                to="/"
                className="block py-2 hover:text-blue-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="border-b border-gray-100">
              <Link
                to="/about"
                className="block py-2 hover:text-blue-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>

            {/* Mobile Category */}
            <li className="border-b border-gray-100">
              <div
                className="flex justify-between items-center py-2 cursor-pointer hover:text-blue-900"
                onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
              >
                <span>Category</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
                    isMobileCategoryOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {isMobileCategoryOpen && (
                <ul className="bg-gray-100 rounded-lg pl-4 pr-2 py-2 mb-2 space-y-1">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <li key={cat._id}>
                        <Link
                          to={`/category/${cat._id}`}
                          className="block py-2 text-sm text-gray-600 hover:text-blue-900 border-l-2 border-transparent hover:border-blue-900 pl-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400 py-1 pl-2">
                      No Categories Found
                    </li>
                  )}
                </ul>
              )}
            </li>

            {/* BLOG LINK (Mobile Updated) */}
            <li className="border-b border-gray-100">
              <Link
                to="/blogs"
                className="block py-2 hover:text-blue-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blogs
              </Link>
            </li>
          </ul>

          <Link to="/contact">
            <button className="w-full mt-6 bg-blue-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition">
              Contact Us
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
