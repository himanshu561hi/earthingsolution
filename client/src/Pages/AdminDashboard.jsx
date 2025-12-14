import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || " ";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("view-all");

  // --- Form States ---
  const [catName, setCatName] = useState("");
  const [catImage, setCatImage] = useState("");

  const [prodName, setProdName] = useState("");
  const [prodCategory, setProdCategory] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodImage, setProdImage] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [isPopular, setIsPopular] = useState(false);

  // -- Client & Cert Form States --
  const [clientName, setClientName] = useState("");
  const [clientLogo, setClientLogo] = useState("");
  const [certName, setCertName] = useState("");
  const [certImage, setCertImage] = useState("");

  // -- Blog Form States --
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("VRD Creative");
  const [blogDate, setBlogDate] = useState("");
  const [blogContent, setBlogContent] = useState("");

  // --- Data List States ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [generalEnquiries, setGeneralEnquiries] = useState([]);
  const [clients, setClients] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // --- TOGGLE STATES ---
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [isGeneralEnquiriesOpen, setIsGeneralEnquiriesOpen] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("adminUser");
    if (!user) {
      navigate("/admin");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const prodRes = await axios.get(API_URL + "/api/products");
      const catRes = await axios.get(API_URL + "/api/categories");
      const enqRes = await axios.get(API_URL + "/api/admin/enquiries");
      const genEnqRes = await axios.get(
        API_URL + "/api/admin/general-enquiries"
      );
      const clientRes = await axios.get(API_URL + "/api/clients");
      const certRes = await axios.get(API_URL + "/api/certifications");
      const blogRes = await axios.get(API_URL + "/api/blogs");

      setProducts(prodRes.data);
      setCategories(catRes.data);
      setEnquiries(enqRes.data.data);
      setGeneralEnquiries(genEnqRes.data);
      setClients(clientRes.data);
      setCertifications(certRes.data);
      setBlogs(blogRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // --- ADD HANDLERS ---
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "/api/categories", {
        name: catName,
        image: catImage,
      });
      alert("Category Added!");
      setCatName("");
      setCatImage("");
      fetchData();
    } catch (err) {
      alert("Error");
    }
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "/api/products", {
        name: prodName,
        category: prodCategory,
        price: prodPrice,
        image: prodImage,
        description: prodDesc,
        isPopular: isPopular,
      });
      alert("Product Added!");
      setProdName("");
      setProdCategory("");
      setProdPrice("");
      setProdImage("");
      setProdDesc("");
      setIsPopular(false);
      fetchData();
    } catch (err) {
      alert("Error");
    }
  };
  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "/api/clients", {
        name: clientName,
        logo: clientLogo,
      });
      alert("Client Added!");
      setClientName("");
      setClientLogo("");
      fetchData();
    } catch (err) {
      alert("Error");
    }
  };
  const handleAddCertification = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "/api/certifications", {
        name: certName,
        image: certImage,
      });
      alert("Added!");
      setCertName("");
      setCertImage("");
      fetchData();
    } catch (err) {
      alert("Error");
    }
  };
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "/api/blogs", {
        title: blogTitle,
        image: blogImage,
        author: blogAuthor,
        date: blogDate,
        content: blogContent,
      });
      alert("Published!");
      setBlogTitle("");
      setBlogImage("");
      setBlogDate("");
      setBlogContent("");
      fetchData();
    } catch (err) {
      alert("Error");
    }
  };

  // --- DELETE HANDLERS ---
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete Product?")) {
      try {
        await axios.delete(API_URL + `/api/products/${id}`);
        fetchData();
      } catch (e) {
        alert("Error");
      }
    }
  };

  // NEW: Delete Category
  const handleDeleteCategory = async (id) => {
    if (window.confirm("Delete this category?")) {
      try {
        await axios.delete(API_URL + `/api/categories/${id}`);
        fetchData();
      } catch (e) {
        alert("Error deleting category. Make sure backend route exists.");
      }
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm("Delete Client?")) {
      try {
        await axios.delete(API_URL + `/api/clients/${id}`);
        fetchData();
      } catch (e) {
        alert("Error");
      }
    }
  };
  const handleDeleteCertification = async (id) => {
    if (window.confirm("Delete Certificate?")) {
      try {
        await axios.delete(API_URL + `/api/certifications/${id}`);
        fetchData();
      } catch (e) {
        alert("Error");
      }
    }
  };
  const handleDeleteBlog = async (id) => {
    if (window.confirm("Delete Blog?")) {
      try {
        await axios.delete(API_URL + `/api/blogs/${id}`);
        fetchData();
      } catch (e) {
        alert("Error");
      }
    }
  };

  const handleDeleteGeneralEnquiry = async (id) => {
    if (!window.confirm("Delete enquiry?")) return;
    try {
      await axios.delete(API_URL + `/api/admin/general-enquiries/${id}`);
      fetchData();
    } catch (error) {
      alert("Failed to delete");
    }
  };
  const deleteEnquiry = async (enquiryId) => {
    if (!window.confirm("Delete?")) return;
    try {
      await axios.delete(API_URL + `/api/admin/enquiries/${enquiryId}`);
      fetchData();
    } catch (error) {
      console.error("Error");
    }
  };

  // --- STATUS UPDATES ---
  const updateGeneralEnquiryStatus = async (id, newStatus) => {
    try {
      await axios.patch(API_URL + `/api/admin/general-enquiries/${id}/status`, {
        status: newStatus,
      });
      fetchData();
    } catch (error) {
      console.error("Error");
    }
  };
  const updateEnquiryStatus = async (enquiryId, newStatus) => {
    try {
      await axios.patch(API_URL + `/api/admin/enquiries/${enquiryId}/status`, {
        status: newStatus,
      });
      fetchData();
    } catch (error) {
      console.error("Error");
    }
  };
  const toggleEnquiries = (prodId) => {
    if (expandedProductId === prodId) setExpandedProductId(null);
    else setExpandedProductId(prodId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Manage Content & Enquiries</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("adminUser");
            navigate("/admin");
          }}
          className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition shadow-sm"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {[
          "add-product",
          "add-category",
          "add-client",
          "add-cert",
          "add-blog",
          "view-all",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-medium transition capitalize ${
              activeTab === tab
                ? "bg-blue-900 text-white shadow"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.replace("add-", "+ ").replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Forms (Condensed) */}
      {activeTab === "add-product" && (
        <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Add Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-3 rounded"
              value={prodName}
              onChange={(e) => setProdName(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                className="w-full border p-3 rounded"
                value={prodCategory}
                onChange={(e) => setProdCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Price"
                className="w-full border p-3 rounded"
                value={prodPrice}
                onChange={(e) => setProdPrice(e.target.value)}
                required
              />
            </div>
            <input
              type="text"
              placeholder="Image URL"
              className="w-full border p-3 rounded"
              value={prodImage}
              onChange={(e) => setProdImage(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              rows="3"
              className="w-full border p-3 rounded"
              value={prodDesc}
              onChange={(e) => setProdDesc(e.target.value)}
            ></textarea>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded border">
              <input
                type="checkbox"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
              />{" "}
              <label>Popular?</label>
            </div>
            <button className="bg-green-600 text-white w-full py-3 rounded font-bold">
              Save Product
            </button>
          </form>
        </div>
      )}
      {activeTab === "add-category" && (
        <div className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Add Category</h2>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-3 rounded"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full border p-3 rounded"
              value={catImage}
              onChange={(e) => setCatImage(e.target.value)}
              required
            />
            <button className="bg-blue-900 text-white w-full py-3 rounded font-bold">
              Save Category
            </button>
          </form>
        </div>
      )}
      {activeTab === "add-client" && (
        <div className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Add Client</h2>
          <form onSubmit={handleAddClient} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-3 rounded"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Logo URL"
              className="w-full border p-3 rounded"
              value={clientLogo}
              onChange={(e) => setClientLogo(e.target.value)}
              required
            />
            <button className="bg-blue-900 text-white w-full py-3 rounded font-bold">
              Save Client
            </button>
          </form>
        </div>
      )}
      {activeTab === "add-cert" && (
        <div className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Add Certification</h2>
          <form onSubmit={handleAddCertification} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-3 rounded"
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full border p-3 rounded"
              value={certImage}
              onChange={(e) => setCertImage(e.target.value)}
              required
            />
            <button className="bg-blue-900 text-white w-full py-3 rounded font-bold">
              Save Certificate
            </button>
          </form>
        </div>
      )}
      {activeTab === "add-blog" && (
        <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Add Blog</h2>
          <form onSubmit={handleAddBlog} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full border p-3 rounded"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Author"
                className="w-full border p-3 rounded"
                value={blogAuthor}
                onChange={(e) => setBlogAuthor(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Date"
                className="w-full border p-3 rounded"
                value={blogDate}
                onChange={(e) => setBlogDate(e.target.value)}
                required
              />
            </div>
            <input
              type="text"
              placeholder="Image URL"
              className="w-full border p-3 rounded"
              value={blogImage}
              onChange={(e) => setBlogImage(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              rows="6"
              className="w-full border p-3 rounded"
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              required
            ></textarea>
            <button className="bg-blue-900 text-white w-full py-3 rounded font-bold">
              Publish Blog
            </button>
          </form>
        </div>
      )}

      {/* --- VIEW ALL DATA --- */}
      {activeTab === "view-all" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            {/* GENERAL ENQUIRIES (Collapsible) */}
            <div className="bg-white rounded-xl shadow-md border border-orange-200 overflow-hidden">
              <div
                className="bg-orange-50 px-6 py-4 border-b border-orange-200 flex justify-between items-center cursor-pointer hover:bg-orange-100 transition"
                onClick={() =>
                  setIsGeneralEnquiriesOpen(!isGeneralEnquiriesOpen)
                }
              >
                <h3 className="font-bold text-xl text-orange-900">
                  General Enquiries ({generalEnquiries.length})
                </h3>
                <span className="text-orange-900 font-bold text-xl">
                  {isGeneralEnquiriesOpen ? "−" : "+"}
                </span>
              </div>
              {isGeneralEnquiriesOpen && (
                <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                  {generalEnquiries.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">
                      No new messages.
                    </p>
                  ) : (
                    generalEnquiries.map((enq) => (
                      <div
                        key={enq._id}
                        className="relative border border-orange-100 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
                      >
                        {enq.status === "Closed" && (
                          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                            <div
                              className="border-4 border-red-600 text-red-600 font-black text-2xl px-8 py-2 -rotate-12 opacity-40 uppercase"
                              style={{ borderStyle: "double" }}
                            >
                              CLOSED
                            </div>
                          </div>
                        )}
                        <div
                          className={`flex flex-col md:flex-row justify-between items-start ${
                            enq.status === "Closed" ? "opacity-50" : ""
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-gray-800 text-lg">
                                {enq.name}
                              </p>
                              {enq.status === "Contacted" && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold border border-green-200">
                                  ✓ Contacted
                                </span>
                              )}
                              {(enq.status === "New" || !enq.status) && (
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold border border-orange-200">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {enq.email} • {enq.phone}
                            </p>
                            <div className="mt-3 bg-gray-50 p-3 rounded text-gray-700 italic border-l-4 border-orange-300">
                              "{enq.message}"
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                              {new Date(enq.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex flex-row md:flex-col gap-2 z-30 mt-4 md:mt-0 md:ml-4 min-w-[120px]">
                            {(enq.status === "New" || !enq.status) && (
                              <button
                                onClick={() =>
                                  updateGeneralEnquiryStatus(
                                    enq._id,
                                    "Contacted"
                                  )
                                }
                                className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700"
                              >
                                ✅ Contacted
                              </button>
                            )}
                            {enq.status === "Contacted" && (
                              <button
                                onClick={() =>
                                  updateGeneralEnquiryStatus(enq._id, "Closed")
                                }
                                className="bg-blue-900 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-800"
                              >
                                🔒 Close
                              </button>
                            )}
                            <button
                              onClick={() =>
                                handleDeleteGeneralEnquiry(enq._id)
                              }
                              className="text-red-500 border border-red-200 px-3 py-1.5 rounded text-sm hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* ALL PRODUCTS */}
            <div>
              <h3 className="font-bold text-xl mb-4 text-blue-900 border-b pb-2">
                All Products ({products.length})
              </h3>
              <div className="space-y-4">
                {products.map((p) => {
                  const myEnquiries = enquiries.filter(
                    (e) => e.productId && e.productId._id === p._id
                  );
                  const activeCount = myEnquiries.filter(
                    (e) => e.status !== "closed"
                  ).length;
                  const isExpanded = expandedProductId === p._id;
                  return (
                    <div
                      key={p._id}
                      className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
                    >
                      <div className="p-4 flex justify-between items-center bg-gray-50">
                        <div className="flex items-center gap-4">
                          <img
                            src={p.image}
                            alt=""
                            className="w-12 h-12 object-cover rounded border border-gray-300"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-gray-800">
                                {p.name}
                              </p>
                              {p.isPopular && (
                                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded font-bold border border-yellow-200">
                                  ⭐ Popular
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 font-medium">
                              {p.category} •{" "}
                              <span className="text-green-600 font-bold">
                                ₹{p.price}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleEnquiries(p._id)}
                            className={`text-sm px-4 py-1.5 rounded font-medium border ${
                              isExpanded
                                ? "bg-blue-100 text-blue-800"
                                : "bg-white text-gray-600"
                            }`}
                          >
                            {isExpanded ? "Hide" : `Enquiries (${activeCount})`}
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p._id)}
                            className="text-red-500 bg-white border border-red-200 px-3 py-1.5 rounded hover:bg-red-50 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="bg-blue-50 p-4 border-t border-blue-100">
                          {myEnquiries.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">
                              No enquiries.
                            </p>
                          ) : (
                            <div className="space-y-4">
                              {myEnquiries.map((enq) => {
                                const isClosed = enq.status === "closed";
                                const isContacted = enq.status === "contacted";
                                return (
                                  <div
                                    key={enq._id}
                                    className="relative bg-white p-5 rounded-lg border border-gray-200 shadow-sm transition-all overflow-hidden"
                                  >
                                    {isClosed && (
                                      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                        <div
                                          className="border-4 border-red-600 text-red-600 font-black text-2xl px-8 py-2 -rotate-8 opacity-60 uppercase"
                                          style={{ borderStyle: "double" }}
                                        >
                                          CLOSED
                                        </div>
                                      </div>
                                    )}
                                    <div
                                      className={`flex flex-col md:flex-row justify-between items-start ${
                                        isClosed ? "opacity-40 blur-[1px]" : ""
                                      }`}
                                    >
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <p className="font-bold text-lg text-gray-800">
                                            {enq.customerName}
                                          </p>
                                          {isContacted && !isClosed && (
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold border border-green-200">
                                              ✓ Contacted
                                            </span>
                                          )}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1 space-y-1">
                                          <p>📞 {enq.phone}</p>
                                          <p>✉️ {enq.email}</p>
                                        </div>
                                        <div className="mt-3 bg-gray-50 p-3 rounded text-gray-700 italic border-l-4 border-blue-200">
                                          "{enq.message}"
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">
                                          {new Date(
                                            enq.createdAt
                                          ).toLocaleString()}
                                        </p>
                                      </div>
                                      <div className="flex flex-row md:flex-col gap-2 z-30 mt-4 md:mt-0 md:ml-4">
                                        {(!enq.status ||
                                          enq.status === "pending") && (
                                          <button
                                            onClick={() =>
                                              updateEnquiryStatus(
                                                enq._id,
                                                "contacted"
                                              )
                                            }
                                            className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
                                          >
                                            ✅ Contacted
                                          </button>
                                        )}
                                        {enq.status === "contacted" && (
                                          <button
                                            onClick={() =>
                                              updateEnquiryStatus(
                                                enq._id,
                                                "closed"
                                              )
                                            }
                                            className="bg-blue-900 text-white px-4 py-2 rounded text-sm hover:bg-blue-800"
                                          >
                                            🔒 Mark Closed
                                          </button>
                                        )}
                                        <button
                                          onClick={() => deleteEnquiry(enq._id)}
                                          className="text-red-500 bg-white border border-red-200 px-4 py-2 rounded text-sm hover:bg-red-50"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (Widgets with DELETE BUTTONS) */}
          <div className="space-y-6">
            {/* Categories Widget */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-bold text-xl mb-4 text-blue-900 border-b pb-2">
                Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((c) => (
                  <li
                    key={c._id}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded hover:bg-gray-100 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={c.image}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                      <span className="font-medium text-gray-700">
                        {c.name}
                      </span>
                    </div>
                    {/* Delete Category Button */}
                    <button
                      onClick={() => handleDeleteCategory(c._id)}
                      className="text-red-500 hover:text-red-700 px-2 text-lg font-bold opacity-0 group-hover:opacity-100 transition"
                      title="Delete Category"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clients Widget */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-bold text-xl mb-4 text-blue-900 border-b pb-2">
                Our Clients
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {clients.map((c) => (
                  <div
                    key={c._id}
                    className="relative group bg-gray-50 p-2 rounded border flex items-center justify-center h-16"
                    title={c.name}
                  >
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="max-w-full max-h-full object-contain"
                    />
                    {/* Delete Client Button */}
                    <button
                      onClick={() => handleDeleteClient(c._id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-red-600"
                      title="Delete Client"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Widget */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-bold text-xl mb-4 text-blue-900 border-b pb-2">
                Certifications
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {certifications.map((c) => (
                  <div
                    key={c._id}
                    className="relative group bg-gray-50 p-2 rounded border flex items-center justify-center h-16"
                    title={c.name}
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="max-w-full max-h-full object-contain"
                    />
                    {/* Delete Certification Button */}
                    <button
                      onClick={() => handleDeleteCertification(c._id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-red-600"
                      title="Delete Certificate"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Blogs Widget */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-bold text-xl mb-4 text-blue-900 border-b pb-2">
                Blogs ({blogs.length})
              </h3>
              <div className="space-y-2">
                {blogs.map((b) => (
                  <div
                    key={b._id}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded border group"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img
                        src={b.image}
                        className="w-8 h-8 rounded object-cover"
                        alt=""
                      />
                      <span className="text-xs font-bold truncate">
                        {b.title}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteBlog(b._id)}
                      className="text-red-500 text-xs px-2 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
