import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get(API_URL + "/api/products/popular");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching popular products:", error);
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* --- Section Header --- */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">
            Our Best Sellers
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">
            Popular Products
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Discover top-rated safety solutions engineered for reliability and
            performance.
          </p>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* --- Product Grid --- */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No popular products found right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden"
              >
                {/* --- Image Section with Padding and Border --- */}
                {/* 1. Outer container with padding (p-3) */}
                <div className="relative bg-white p-3 rounded-t-2xl">
                  {/* 2. Inner container with Border and Rounded Corners */}
                  <div className="relative h-64 overflow-hidden rounded-xl border border-slate-200 group-hover:border-blue-400 transition-colors duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Tag Badge (Moved inside the bordered area) */}
                    {product.tag && (
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm shadow-md z-10">
                        {product.tag}
                      </div>
                    )}
                  </div>
                </div>

                {/* --- Content Section --- */}
                <div className="p-6 pt-4 flex flex-col flex-grow">
                  {/* Category */}
                  <div className="mb-3">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-800 mb-4 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Spacer */}
                  <div className="flex-grow"></div>

                  {/* View Details Button */}
                  <Link
                    to={`/product/${product._id}`}
                    className="w-full block text-center bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- View All Button --- */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 font-bold text-blue-900 border-2 border-blue-900 rounded-full hover:bg-blue-900 hover:text-white transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
