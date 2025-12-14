import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const Certification = () => {
  const [certs, setCerts] = useState([]);

  // Fetch from DB
  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await axios.get(API_URL + "/api/certifications");
        setCerts(res.data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };
    fetchCerts();
  }, []);

  if (certs.length === 0) return null;

  return (
    <section className="bg-white py-12 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-16">
        {/* Heading Center */}
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 text-black mb-6 text-center">
          Our Certification
        </h2>

        {/* Paragraph also Centered */}
        <div className="flex justify-center mb-12">
          <p className="text-center text-gray-600 max-w-4xl leading-relaxed">
            ISO 9001 certified and rigorously tested by leading labs—delivering
            unmatched safety and durability for your infrastructure.
          </p>
        </div>

        {/* Dynamic Logos */}
        <div className="flex flex-wrap justify-center gap-10 items-center">
          {certs.map((cert) => (
            <div
              key={cert._id}
              // CHANGES HERE:
              // 1. 'overflow-hidden': Taaki image circle ke bahar na nikle.
              // 2. Removed 'p-4': Taaki image kinaro tak touch ho.
              // 3. Size wahi hai (w-40/h-40 etc).
              className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-300 bg-white rounded-full shadow-sm border border-gray-100"
              title={cert.name}
            >
              <img
                src={cert.image}
                alt={cert.name}
                // CHANGE HERE: 'object-cover' ensures image fills the circle and crops excess
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certification;
