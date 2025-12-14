import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  useEffect(() => {
    // Backend se data mangwana
    axios
      .get(API_URL + "/api/admin/enquiries")
      .then((res) => setEnquiries(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Customer Enquiries
      </h2>

      {enquiries.length === 0 ? (
        <p className="text-gray-500">Abhi koi enquiry nahi aayi hai.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Product Interested</th>
                <th className="p-3 border">Message</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {enquiries.map((enq) => (
                <tr key={enq._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-gray-500">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <p className="font-bold">{enq.customerName}</p>
                    <p className="text-xs text-blue-600">{enq.email}</p>
                    <p className="text-xs text-gray-500">{enq.phone}</p>
                  </td>

                  <td className="p-3">
                    {enq.productId ? (
                      <div className="flex items-center gap-2">
                        {/* Agar image h to dikhaye, warnaa nahi */}
                        {enq.productId.image && (
                          <img
                            src={enq.productId.image}
                            className="w-8 h-8 object-cover rounded"
                            alt=""
                          />
                        )}
                        <span className="font-medium text-indigo-700">
                          {enq.productId.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-red-500 text-xs">
                        Product Deleted
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-gray-600 max-w-xs truncate">
                    {enq.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
