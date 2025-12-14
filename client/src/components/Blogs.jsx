import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API_URL + "/api/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section id="blogs" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 text-black mb-2 text-center">
          Our Blogs
        </h2>
        <p className="text-center text-gray-600 m-4 mb-10 max-w-2xl mx-auto">
          Stay updated with expert insights, industry trends, and essential tips
          on electrical safety and grounding solutions.
        </p>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group border border-gray-100"
            >
              {/* Image Section */}
              {/* Added 'bg-gray-50' so empty space (if any) looks clean */}
              <div className="h-48 overflow-hidden relative bg-gray-50 flex items-center justify-center">
                <img
                  src={blog.image}
                  alt={blog.title}
                  // CHANGE: 'object-contain' use kiya taaki image crop na ho aur puri dikhe
                  // 'p-2' add kiya taaki thoda breathing space rahe
                  className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-blue-900 shadow-sm border border-gray-100">
                  {blog.date}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg leading-snug mb-3 line-clamp-2 group-hover:text-blue-900 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-4">
                  By {blog.author}
                </p>

                {/* Read More Link */}
                <Link
                  to={`/blog/${blog._id}`}
                  className="inline-flex items-center text-sm font-semibold text-blue-900 hover:text-blue-700 transition-colors"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
