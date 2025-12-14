import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const OurPresence = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const regions = [
    {
      title: "North India",
      states: [
        "Delhi NCR",
        "Uttar Pradesh",
        "Punjab",
        "Haryana",
        "Uttarakhand",
        "Rajasthan",
      ],
    },
    {
      title: "West India",
      states: ["Maharashtra", "Gujarat", "Madhya Pradesh", "Goa"],
    },
    {
      title: "South India",
      states: [
        "Karnataka",
        "Tamil Nadu",
        "Telangana",
        "Kerala",
        "Andhra Pradesh",
      ],
    },
    {
      title: "East India",
      states: ["West Bengal", "Bihar", "Odisha", "Assam", "Jharkhand"],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      <div className="bg-blue-900 py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Presence</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Delivering Safety Across the Nation. From metropolitan cities to
            remote industrial hubs, VTR Infotech is everywhere you need us.
          </p>
        </div>
      </div>

      {/* --- MAP VISUAL SECTION --- */}
      <div className="container mx-auto px-4 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left: Content */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Serving <span className="text-blue-900">20+ States</span> in India
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              We have established a robust supply chain network that ensures
              timely delivery of our Chemical Earthing Electrodes and Lightning
              Protection Systems to any corner of the country.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-900">
                <h3 className="text-2xl font-bold text-gray-800">500+</h3>
                <p className="text-sm text-gray-500">Projects Completed</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-600">
                <h3 className="text-2xl font-bold text-gray-800">100%</h3>
                <p className="text-sm text-gray-500">On-Time Delivery</p>
              </div>
            </div>
          </div>

          {/* Right: Map Visual (SVG Code) */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* INDIA MAP SVG (Direct Code - No External Image Link) */}
              <svg
                viewBox="0 0 612 792"
                className="w-full h-auto drop-shadow-xl"
                fill="#e2e8f0" // Light gray color map
                stroke="white"
                strokeWidth="2"
              >
                {/* Simplified Path for India Map */}
                <path
                  d="M294.5,14.6c13.6,18.5,29.9,35.1,38.8,56.5c3,7.2,1.3,16,6.4,22.1c8.3,10,23.3,12,32.3,21.9
                  c7.6,8.4,7.8,21.6,15.6,29.5c9.2,9.3,23.6,10.2,35.1,16.2c9.5,4.9,18.7,11.3,25.4,20.1c11.6,15.3,10.7,37.3,18.6,54.6
                  c3.6,7.8,11.8,12.7,16.6,20c6.6,10.1,6.8,23.5,13.8,33.2c5.9,8.2,16.5,11.8,22.2,20.2c7.6,11.2,3.3,26.5,5.1,39.4
                  c1.3,9.5,7.1,17.4,8.5,27c2.3,15.6-5.1,31.4-12.7,45.4c-5.4,9.9-10.9,19.9-14.9,30.5c-4.3,11.4-2.8,24.4-6.8,35.8
                  c-4.9,13.9-16.1,23.8-24.9,35.5c-8.9,11.9-13.8,26.7-22.9,38.2c-9.1,11.6-21.7,19.4-32.5,29.6c-13.7,13-23.7,30-38.3,41.9
                  c-11.8,9.7-25.7,16.5-38.2,25.3c-14,9.8-26.6,22.3-41.2,30.9c-12.2,7.2-26,11.6-38.8,17.5c-10.5,4.8-21.1,10.4-32.3,12.8
                  c-10.5,2.2-21.6-0.7-31.9-3.2c-12.6-3.1-24.2-9.6-36.2-13.7c-9.2-3.1-18.9-4.8-28.4-6.4c-13.4-2.2-27-3.9-39.7-8.9
                  c-10.8-4.2-20.1-11.5-30.8-15.3c-11.9-4.2-24.9-3.9-37.1-7.1c-12.5-3.3-23.6-11-35.3-15.6c-12.3-4.8-25.5-7.3-37.9-12.3
                  c-9.9-4-19.1-10.1-27.9-16.1c-8.1-5.5-15.2-12.4-21.9-19.6c-6.2-6.6-11.6-14-15.9-21.9c-3.7-6.8-5.3-14.7-6.2-22.4
                  c-0.8-6.9,0.2-14,2.5-20.6c3.2-9.2,9.6-16.9,15.4-24.8c6.6-9,12.4-18.6,16.9-28.7c3.8-8.5,5.6-18,6.8-27.3
                  c1.3-9.9,0.3-20,1.8-29.9c1.9-12.3,7.6-23.7,13.7-34.5c6.5-11.6,14.7-22.3,21.7-33.6c5.5-8.8,9.4-18.5,12.6-28.4
                  c3.3-10.3,4.7-21.2,6.9-31.8c2.4-11.6,5.6-23,10.6-33.8c4.3-9.4,10.7-17.6,16.5-26.1c6.5-9.5,12.1-19.7,16.2-30.4
                  c3.5-9.1,4.9-19,7.6-28.4c3.4-11.8,9.9-22.5,16.6-32.8c6.7-10.3,14.7-19.7,21.7-29.8c5.4-7.8,9.6-16.4,13.2-25.2
                  c4-9.8,5.7-20.5,9.2-30.7c3.1-9,7.8-17.3,13.1-25.2c6.1-9.1,13.5-17.3,19.3-26.6c4.6-7.4,7.8-15.6,10.6-23.9
                  c2.8-8.3,3.9-17.1,6.5-25.5c2.9-9.4,8.1-17.9,13.8-25.9c6.3-8.8,13.9-16.7,20.5-25.5C279.8,36.5,286.9,25.9,294.5,14.6z"
                />
              </svg>

              {/* Pin Points Animation (Adjusted for SVG) */}
              <span className="absolute top-[30%] left-[30%] w-4 h-4 bg-red-600 rounded-full animate-ping opacity-75"></span>
              <span className="absolute top-[30%] left-[30%] w-4 h-4 bg-red-600 rounded-full border-2 border-white"></span>

              <span className="absolute top-[50%] left-[25%] w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-75"></span>
              <span className="absolute top-[50%] left-[25%] w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></span>

              <span className="absolute top-[65%] left-[40%] w-4 h-4 bg-green-600 rounded-full animate-ping opacity-75"></span>
              <span className="absolute top-[65%] left-[40%] w-4 h-4 bg-green-600 rounded-full border-2 border-white"></span>

              <span className="absolute top-[45%] right-[25%] w-4 h-4 bg-yellow-500 rounded-full animate-ping opacity-75"></span>
              <span className="absolute top-[45%] right-[25%] w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></span>
            </div>
          </div>
        </div>
      </div>

      {/* --- REGIONAL LISTING --- */}
      <div className="bg-white py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Supply Network
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {regions.map((region, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition duration-300 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2 border-gray-200">
                  {region.title}
                </h3>
                <ul className="space-y-2">
                  {region.states.map((state, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <span className="text-green-500">✔</span> {state}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- BECOME A PARTNER CTA --- */}
      <div className="bg-blue-900 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            Want to Become a Distributor?
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Join our growing network. We are looking for channel partners and
            dealers across unrepresented areas.
          </p>
          <Link to="/contact">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
              Contact Us Today
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurPresence;
