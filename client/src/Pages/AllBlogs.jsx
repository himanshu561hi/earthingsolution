import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Blogs API
  useEffect(() => {
    window.scrollTo(0, 0); // Page load hote hi top par scroll ho
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API_URL + "/api/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-bold text-blue-900 animate-pulse">
          Loading Blogs...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      <div className="relative bg-blue-900 py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 lg:px-12 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Latest Insights
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Explore articles on electrical safety, earthing technologies, and
            industry updates.
          </p>
        </div>
      </div>

      {/* --- BLOG GRID SECTION --- */}
      <div className="container mx-auto px-4 lg:px-12 py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400">
              No blogs posted yet.
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full"
              >
                {/* Image Section (Fixed with object-contain) */}
                <div className="h-48 overflow-hidden relative bg-gray-50 flex items-center justify-center border-b border-gray-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-blue-900 shadow-sm border border-gray-200">
                    {blog.date}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-900 text-lg leading-snug mb-3 line-clamp-2 group-hover:text-blue-900 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-4">
                    By {blog.author}
                  </p>

                  {/* Spacer to push 'Read More' to bottom */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link
                      to={`/blog/${blog._id}`}
                      className="inline-flex items-center text-sm font-bold text-blue-900 hover:text-blue-700 transition-colors"
                    >
                      Read Article
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
