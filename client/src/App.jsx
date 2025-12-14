import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages Import karein
import Home from "./Pages/Home";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import ProductDetails from "./Pages/ProductDetails";
import Footer from "./components/Footer";
import CategoryPage from "./Pages/CategoryPage";
import BlogDetails from "./Pages/BlogDetails";
import About from "./Pages/About";
import SearchResults from "./Pages/SearchResults";
import Contact from "./Pages/Contact";
import AllBlogs from "./Pages/AllBlogs";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/TermsConditions";
import OurPresence from "./Pages/OurPresence";

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar <BrowserRouter> ke andar hona chahiye lekin <Routes> ke bahar */}
      {/* Isse Navbar har page par dikhega */}
      <Navbar />

      <Routes>
        {/* Ye Route batata hai ki "/" link par sirf Home component dikhana hai */}
        <Route path="/" element={<Home />} />

        {/* Admin Login page par slider nahi dikhega kyunki wo Home component ke andar hai */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/our-presence" element={<OurPresence />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
