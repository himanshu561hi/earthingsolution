import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get(API_URL + "/api/clients");
        setClients(res.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  if (clients.length === 0) return null;

  // Threshold: 6 se kam hain to Animation OFF
  const shouldAnimate = clients.length >= 6;

  // Split Data Logic
  const midPoint = Math.ceil(clients.length / 2);
  const row1Clients = clients.slice(0, midPoint);
  const row2Clients = clients.slice(midPoint);

  const topList = row1Clients.length > 0 ? row1Clients : clients;
  const bottomList = row2Clients.length > 0 ? row2Clients : clients;

  // Duplication Logic
  const upperMarquee = shouldAnimate ? Array(10).fill(topList).flat() : [];
  const lowerMarquee = shouldAnimate ? Array(10).fill(bottomList).flat() : [];

  return (
    <section className="bg-white py-16 border-t border-gray-100 overflow-hidden">
      {/* Animation Styles */}
      {shouldAnimate && (
        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left {
            display: flex;
            width: max-content;
            animation: scroll-left 60s linear infinite;
          }
          .animate-scroll-right {
            display: flex;
            width: max-content;
            animation: scroll-right 60s linear infinite;
          }
          .marquee-wrapper:hover .animate-scroll-left,
          .marquee-wrapper:hover .animate-scroll-right {
            animation-play-state: paused;
          }
        `}</style>
      )}

      <div className="container mx-auto px-4 lg:px-8">
        {/* Heading Center */}
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 text-black text-center">
          Our Clients
        </h2>
        <p className="text-center text-gray-600 mt-6 mb-12 max-w-4xl mx-auto leading-relaxed">
          Trusted by global leaders for consistent quality and innovative
          electrical safety solutions that meet world-class standards.
        </p>

        {/* --- CONDITIONAL RENDERING --- */}

        {!shouldAnimate ? (
          // SCENARIO 1: KAM CLIENTS (Center Aligned)
          <div className="flex flex-wrap justify-center items-center gap-10">
            {clients.map((client) => (
              <ClientCard key={client._id} client={client} />
            ))}
          </div>
        ) : (
          // SCENARIO 2: ZYADA CLIENTS (Animation)
          <div className="w-full flex flex-col gap-10 overflow-hidden relative marquee-wrapper">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

            {/* ROW 1 */}
            <div className="overflow-hidden">
              <div className="animate-scroll-right flex gap-10 items-center">
                {upperMarquee.map((client, index) => (
                  <ClientCard
                    key={`${client._id}-top-${index}`}
                    client={client}
                  />
                ))}
              </div>
            </div>

            {/* ROW 2 */}
            <div className="overflow-hidden">
              <div className="animate-scroll-left flex gap-10 items-center">
                {lowerMarquee.map((client, index) => (
                  <ClientCard
                    key={`${client._id}-bottom-${index}`}
                    client={client}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Card Component (UPDATED FOR CROP FIT)
const ClientCard = ({ client }) => (
  <div
    // CHANGES:
    // 1. Added 'overflow-hidden': Image bahar na nikle
    // 2. Removed 'p-4': Taaki image full circle cover kare
    className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 flex items-center justify-center overflow-hidden bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
    title={client.name}
  >
    <img
      src={client.logo}
      alt={client.name}
      // CHANGE: 'object-cover' + 'w-full h-full' ensures image fits and crops perfectly
      className="w-full h-full object-cover"
    />
  </div>
);

export default Clients;
