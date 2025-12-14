import React from "react";
import HeroSlider from "../components/HeroSlider";
import PopularProducts from "../components/PopularProducts";
import Certification from "../components/Certification";
import Clients from "../components/Clients";
import Blogs from "../components/Blogs";

const Home = () => {
  return (
    <div>
      {/* Slider yahan lagayenge, taaki ye sirf Home page par dikhe */}
      <HeroSlider />
      <PopularProducts />
      <Clients />
      <Certification />
      <Blogs />
    </div>
  );
};

export default Home;
