import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // URL se query nikalo (?q=...)

  const [data, setData] = useState({ products: [], blogs: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      try {
        setLoading(true);
        // Backend API call
        const res = await axios.get(API_URL + `/api/search?q=${query}`);
        setData(res.data);
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]); // Jab query change ho, tab dubara search kare

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-sans">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          Search Results for "<span className="text-blue-900">{query}</span>"
        </h1>

        {loading ? (
          <div className="text-center py-20 text-xl font-semibold text-gray-500">
            Searching...
          </div>
        ) : (
          <>
            {/* --- NO RESULTS FOUND --- */}
            {data.products.length === 0 && data.blogs.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  No results found matching your query.
                </p>
                <Link
                  to="/"
                  className="text-blue-900 font-bold underline mt-2 block"
                >
                  Go Back Home
                </Link>
              </div>
            )}

            {/* --- SECTION 1: PRODUCTS --- */}
            {data.products.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                  🛍️ Products ({data.products.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {data.products.map((product) => (
                    <Link
                      to={`/product/${product._id}`}
                      key={product._id}
                      className="group"
                    >
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                        <div className="h-48 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-xs text-blue-600 font-bold uppercase mb-1">
                            {product.category}
                          </p>
                          <h3 className="font-bold text-gray-800 truncate">
                            {product.name}
                          </h3>
                          <p className="text-green-600 font-bold mt-2">
                            ₹{product.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* --- SECTION 2: BLOGS --- */}
            {data.blogs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                  📝 Blogs ({data.blogs.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.blogs.map((blog) => (
                    <Link
                      to={`/blog/${blog._id}`}
                      key={blog._id}
                      className="group"
                    >
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition flex items-center p-4 gap-4">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        <div>
                          <h3 className="font-bold text-gray-800 leading-snug group-hover:text-blue-900 transition-colors line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {blog.date}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
