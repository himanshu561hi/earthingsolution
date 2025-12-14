import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const BlogDetails = () => {
  const { id } = useParams();

  // States
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [categories, setCategories] = useState([]); // <--- New State for Categories
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Page load hone par top par scroll karein
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Current Blog Details
        const blogRes = await axios.get(API_URL + `/api/blogs/${id}`);
        setBlog(blogRes.data);

        // 2. Fetch All Blogs (For Related Section)
        const allBlogsRes = await axios.get(API_URL + "/api/blogs");
        const otherBlogs = allBlogsRes.data.filter((b) => b._id !== id);
        setRelatedBlogs(otherBlogs);

        // 3. Fetch Categories (Dynamic List for Sidebar)
        const catRes = await axios.get(API_URL + "/api/categories");
        setCategories(catRes.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-20 text-xl font-bold">Loading...</div>
    );

  if (!blog)
    return (
      <div className="text-center py-20 text-xl text-red-500">
        Blog Not Found
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative">
          {/* --- LEFT COLUMN: MAIN CONTENT --- */}
          <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-100 h-fit">
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-bold text-xs uppercase">
                Blog
              </span>
              <span>{blog.date}</span>
              <span>
                By{" "}
                <span className="text-blue-900 font-semibold">
                  {blog.author}
                </span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Image */}
            <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-sm">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {blog.content}
            </div>

            {/* Share */}
            {/* <div className="mt-10 pt-6 border-t border-gray-100">
              <p className="font-bold text-gray-800 mb-2">Share this post:</p>
              <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">
                  Facebook
                </button>
                <button className="bg-sky-500 text-white px-4 py-1 rounded text-sm">
                  Twitter
                </button>
                <button className="bg-green-600 text-white px-4 py-1 rounded text-sm">
                  WhatsApp
                </button>
              </div>
            </div> */}
          </div>

          {/* --- RIGHT COLUMN: SIDEBAR (Sticky) --- */}
          <div className="lg:col-span-1 space-y-8 sticky top-24 h-fit">
            {/* Search Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-xl mb-4 text-gray-800">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  className="w-full border border-gray-300 rounded-lg p-3 pl-4 focus:outline-none focus:border-blue-900"
                />
                <button className="absolute right-3 top-3 text-gray-400">
                  🔍
                </button>
              </div>
            </div>

            {/* Related Blogs Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-h-[50vh] overflow-y-auto custom-scrollbar">
              <h3 className="font-bold text-xl mb-6 text-gray-800 border-b pb-2 sticky top-0 bg-white z-10">
                Related Blogs
              </h3>
              <div className="space-y-6">
                {relatedBlogs.length > 0 ? (
                  relatedBlogs.map((item) => (
                    <Link
                      to={`/blog/${item._id}`}
                      key={item._id}
                      className="flex gap-4 group cursor-pointer"
                    >
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm leading-snug group-hover:text-blue-900 transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.date}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No other blogs available.
                  </p>
                )}
              </div>
            </div>

            {/* --- DYNAMIC CATEGORIES WIDGET --- */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-xl mb-4 text-gray-800 border-b pb-2">
                Categories
              </h3>

              {categories.length > 0 ? (
                <ul className="space-y-2 text-sm text-gray-600">
                  {categories.map((cat) => (
                    <li
                      key={cat._id}
                      className="border-b border-gray-50 last:border-none"
                    >
                      <Link
                        to={`/category/${cat._id}`}
                        className="block py-2 hover:text-blue-900 hover:pl-2 transition-all duration-300 flex justify-between items-center"
                      >
                        {cat.name}
                        <span className="text-gray-400 text-xs">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No categories found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
