import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles (Zaroori hai)
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

// --- Slider ka Data (Images aur Text yahan change karein) ---
const sliderData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example Tech Image
    title: "Innovate with VTR Infotech",
    subtitle: "Your trusted partner for digital safety and cutting-edge solutions.",
    buttonText: "Explore Services"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example Cyber Security Image
    title: "Securing Your Digital Future",
    subtitle: "Advanced protection against modern cyber threats.",
    buttonText: "Get Secured Now"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example Network Image
    title: "Connecting the World Safely",
    subtitle: "Reliable networking infrastructure for growing businesses.",
    buttonText: "Learn More"
  },
];


const HeroSlider = () => {
  return (
    // Slider Container Height (Mobile: 600px, Desktop: 800px - adjust as needed)
    <div className="h-[400px] md:h-[600px] w-full relative group">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000, // 3 seconds per slide
          disableOnInteraction: false,
        }}
        effect={'fade'} // <-- UNIQUE PART: Fade effect instead of slide
        fadeEffect={{ crossFade: true }}
        pagination={{
          clickable: true,
          dynamicBullets: true, // Dots size change honge
        }}
        navigation={true} // Arrows enable
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper h-[600px] w-full"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
             {/* --- Background Image with Dark Overlay --- */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-105 hover:scale-100"
                style={{ backgroundImage: `url(${slide.image})` }}
            >
                {/* Dark Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
            </div>

            {/* --- Content Section --- */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4 md:px-20">
              {/* Title with animation */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-lg animate-fade-in-up">
                {slide.title}
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl font-light animate-fade-in-up animation-delay-200">
                {slide.subtitle}
              </p>
              
              {/* Stylish Button */}
              <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 animate-fade-in-up animation-delay-400">
                {slide.buttonText}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Swiper Navigation Arrows & Dots (To make them look unique) */}
      <style jsx>{`
        /* Arrows color */
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          opacity: 0; /* Hidden by default */
          transition: opacity 0.3s ease;
          background: rgba(0,0,0,0.3);
          padding: 30px;
          border-radius: 50%;
          width: 20px; /* Adjust for circle size */
          height: 20px; /* Adjust for circle size */
        }
        .swiper-button-next:after, .swiper-button-prev:after {
            font-size: 20px !important;
            font-weight: bold;
        }
        
        /* Show arrows on hover */
        .group:hover .swiper-button-next, 
        .group:hover .swiper-button-prev {
            opacity: 1;
        }

        /* Pagination Dots color */
        .swiper-pagination-bullet {
            background: white !important;
            opacity: 0.5;
            width: 12px;
            height: 12px;
        }
        .swiper-pagination-bullet-active {
            opacity: 1;
            background: #1e3a8a !important; /* Blue-900 color */
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;