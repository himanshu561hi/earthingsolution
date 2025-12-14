import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const CategoryPage = () => {
  const { id } = useParams(); // URL se Category ID mili
  const [category, setCategory] = useState(null); // Category ki details (Name, Image)
  const [products, setProducts] = useState([]); // Filtered Products
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Saari Categories lao taaki hum ID se Name match kar sakein
        const catRes = await axios.get(API_URL + "/api/categories");
        const currentCat = catRes.data.find((c) => c._id === id);

        if (currentCat) {
          setCategory(currentCat);

          // 2. Saare Products lao
          const prodRes = await axios.get(API_URL + "/api/products");

          // 3. Filter: Wo products dhundo jinki category name match kare
          const filteredProducts = prodRes.data.filter(
            (p) => p.category === currentCat.name
          );
          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-blue-900">
        Loading Category...
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        <h2 className="text-2xl font-bold">Category Not Found</h2>
        <Link to="/" className="text-blue-900 underline mt-4">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* --- HERO SECTION --- */}
      <div className="relative bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 lg:px-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.name}
          </h1>
          <p className="text-blue-200 text-lg">
            Explore our premium range of {category.name} products.
          </p>
        </div>
        {/* Background Pattern (Optional) */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      {/* --- PRODUCTS GRID --- */}
      <div className="container mx-auto px-4 lg:px-16 mt-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl text-gray-400 font-bold mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500">
              We haven't added products to this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Image */}
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.isPopular && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded shadow">
                      POPULAR
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-bold text-gray-800 text-lg mb-2 truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-green-600">
                      ₹{product.price}
                    </span>
                    <Link
                      to={`/product/${product._id}`}
                      className="bg-blue-900 text-white text-sm px-4 py-2 rounded hover:bg-blue-800 transition"
                    >
                      View Details
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

export default CategoryPage;
