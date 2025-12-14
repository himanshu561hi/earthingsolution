import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Page load hone par top scroll
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      <div className="bg-blue-900 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-blue-200 text-sm">Last Updated: December 2025</p>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="container mx-auto px-4 lg:px-20 py-16">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-gray-700 leading-relaxed space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>VTR Infotech Pvt Ltd</strong>. We value your
              trust and are committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, and safeguard
              your data when you visit our website or use our services related
              to electrical safety and earthing solutions.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We may collect personal identification information from Users in
              various ways, including, but not limited to, when Users visit our
              site, fill out a form, or subscribe to our newsletter.
            </p>
            <ul className="list-disc list-inside bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-2">
              <li>
                <strong>Personal Info:</strong> Name, Email Address, Phone
                Number.
              </li>
              <li>
                <strong>Business Info:</strong> Company Name, Project
                Requirements.
              </li>
              <li>
                <strong>Technical Data:</strong> IP Address, Browser Type,
                Device Information (collected via cookies).
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use the collected information for the following purposes:</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <p>To provide custom quotes and process orders.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <p>To improve our website and customer service.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <p>To send periodic emails regarding updates or products.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <p>To follow up on enquiries made through our forms.</p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              4. Data Protection
            </h2>
            <p>
              We adopt appropriate data collection, storage, and processing
              practices and security measures to protect against unauthorized
              access, alteration, disclosure, or destruction of your personal
              information stored on our site.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              5. Sharing Your Information
            </h2>
            <p>
              We <strong>do not sell, trade, or rent</strong> Users' personal
              identification information to others. We may share generic
              aggregated demographic information not linked to any personal
              identification information regarding visitors and users with our
              business partners for the purposes outlined above.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              6. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-900">
              <p className="font-bold text-blue-900">VTR Infotech Pvt Ltd</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@vtrinfotech.com"
                  className="text-blue-600 hover:underline"
                >
                  info@vtrinfotech.com
                </a>
              </p>
              <p>Phone: +91 98765 43210</p>
              <p>Address: Ghaziabad - 201010, UP, India</p>
            </div>
          </section>

          {/* Back Button */}
          <div className="pt-8 border-t border-gray-200 mt-8">
            <Link to="/">
              <button className="text-blue-900 font-bold hover:underline flex items-center gap-2">
                ← Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
