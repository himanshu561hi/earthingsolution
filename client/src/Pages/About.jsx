import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      <div className="relative bg-blue-900 py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 lg:px-12 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            VTR Infotech is your trusted safety partner, dedicated to providing
            world-class electrical safety and earthing solutions.
          </p>
        </div>
      </div>

      {/* --- WHO WE ARE SECTION --- */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gray-100 rounded-full z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Engineering Team"
                className="relative z-10 rounded-2xl shadow-xl w-full object-cover h-[400px]"
              />
            </div>

            {/* Text Side */}
            <div>
              <h4 className="text-blue-900 font-bold uppercase tracking-wide text-sm mb-2">
                Who We Are
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Leading the Way in <br />
                <span className="text-blue-900">
                  Electrical Safety Solutions
                </span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Established with a vision to make infrastructure safer,{" "}
                <strong>VTR Infotech Pvt Ltd</strong> is a premier manufacturer
                and supplier of advanced Chemical Earthing Electrodes, Lightning
                Protection Systems, and Surge Protection Devices.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We combine cutting-edge technology with high-grade materials
                (Copper, GI, Aluminum) to ensure that your residential,
                commercial, and industrial assets remain protected from
                electrical hazards. Our products are rigorously tested and
                certified to meet global safety standards.
              </p>

              {/* Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "ISO 9001 Certified",
                  "Expert Engineering Team",
                  "Global Safety Standards",
                  "24/7 Support",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 p-1 rounded-full text-xs">
                      ✔
                    </span>
                    <span className="text-gray-700 font-medium text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link to="/contact">
                <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition shadow-lg hover:shadow-blue-200">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-blue-900 py-16 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "10+", label: "Years Experience" },
              { num: "500+", label: "Projects Completed" },
              { num: "50+", label: "Happy Clients" },
              { num: "100%", label: "Safety Record" },
            ].map((stat, index) => (
              <div key={index}>
                <h3 className="text-4xl md:text-5xl font-bold mb-2 text-blue-200">
                  {stat.num}
                </h3>
                <p className="text-sm md:text-base font-medium opacity-80 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VISION & MISSION --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-6">
                🚀
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To provide innovative, reliable, and cost-effective electrical
                safety solutions that protect lives and assets. We strive to set
                new benchmarks in the industry through continuous R&D and a
                customer-centric approach.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-6">
                👁️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become the global leader in earthing and lightning protection
                systems, recognized for our commitment to quality,
                sustainability, and technological excellence in infrastructure
                safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-black mb-12">
            Why Choose VTR Infotech?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Unmatched Safety",
                desc: "Our products undergo rigorous testing to ensure 100% fault protection.",
              },
              {
                icon: "⚙️",
                title: "Premium Quality",
                desc: "We use high-conductivity Copper and heavy-duty GI for long-lasting performance.",
              },
              {
                icon: "🤝",
                title: "Customer Support",
                desc: "Our expert technical team provides end-to-end support from installation to maintenance.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-100 hover:border-blue-200 transition bg-white group hover:shadow-lg"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
