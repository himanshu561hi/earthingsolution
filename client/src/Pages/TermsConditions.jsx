import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
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
            Terms & Conditions
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
              Welcome to <strong>VTR Infotech Pvt Ltd</strong>. These Terms and
              Conditions govern your use of our website and the purchase of our
              products (Chemical Earthing Electrodes, Lightning Arresters,
              etc.). By accessing or using our service, you agree to be bound by
              these terms. If you disagree with any part of the terms, you may
              not access the service.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              2. Product Information
            </h2>
            <p>
              We strive to ensure that all product descriptions, specifications,
              and images on our website are accurate. However, we do not warrant
              that the product descriptions or other content is error-free.
            </p>
            <ul className="list-disc list-inside mt-2 bg-gray-50 p-4 rounded border border-gray-200">
              <li>
                Product specifications are subject to change without prior
                notice for improvements.
              </li>
              <li>
                Custom orders will be manufactured strictly according to the
                client's provided specifications.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              3. Orders & Payments
            </h2>
            <p>
              All orders are subject to acceptance and availability. Prices for
              our products are subject to change without notice.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-900">Payment Terms</h4>
                <p className="text-sm">
                  Payments must be made via authorized channels (Bank Transfer,
                  UPI, Cheque) before dispatch unless otherwise agreed.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-900">Taxes</h4>
                <p className="text-sm">
                  All prices are exclusive of GST unless stated otherwise. GST
                  will be charged as per government norms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              4. Shipping & Delivery
            </h2>
            <p>
              We aim to dispatch products within the agreed timeline. However,{" "}
              <strong>VTR Infotech</strong> is not liable for delays caused by
              logistics partners, natural calamities, or unforeseen
              circumstances. Shipping costs will be calculated based on weight
              and location.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              5. Intellectual Property
            </h2>
            <p>
              The content, logo, layout, and product designs found on this
              website are the intellectual property of{" "}
              <strong>VTR Infotech Pvt Ltd</strong>. You may not reuse,
              republish, or reprint such content without our written consent.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              6. Limitation of Liability
            </h2>
            <p>
              In no event shall VTR Infotech, nor its directors or employees, be
              held liable for any indirect, consequential, or special liability
              arising out of or in any way related to your use of this website
              or our products.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              7. Governing Law
            </h2>
            <p>
              These Terms shall be governed and construed in accordance with the
              laws of India. Any disputes arising out of these terms will be
              subject to the exclusive jurisdiction of the courts in{" "}
              <strong>Ghaziabad, Uttar Pradesh</strong>.
            </p>
          </section>

          {/* Contact Block */}
          <div className="bg-gray-100 p-6 rounded-lg text-center mt-8">
            <p className="font-bold text-gray-800">
              Questions about the Terms?
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Contact us at legal@vtrinfotech.com
            </p>
            <Link to="/contact">
              <button className="bg-blue-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-800 transition">
                Contact Support
              </button>
            </Link>
          </div>

          {/* Back Button */}
          <div className="pt-4">
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

export default TermsConditions;
