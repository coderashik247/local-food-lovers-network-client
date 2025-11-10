import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slider = () => {
  const slides = [
    {
      title: "Discover Local Food Around You 🍲",
      img: "https://i.ibb.co/vC9Ng7YP/food-1.jpg",
    },
    {
      title: "Taste the Best Indian Food in Town 🥘",
      img: "https://i.ibb.co/TBmJdzpv/food-2.jpg",
    },
    {
      title: "Cheesy Pizza Lovers Unite 🍕",
      img: "https://i.ibb.co/0NPSVdk/food-3.jpg",
    },
    {
      title: "Grilled Salmon with Flavor Explosion 🐟",
      img: "https://i.ibb.co/1YrSdtc1/food-4.jpg",
    },
    {
      title: "Garden Salad That Refreshes Your Day 🥗",
      img: "https://i.ibb.co/1fQbkQH0/food-5.jpg",
    },
  ];

  return (
    <div className="slider-container w-full">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        navigation={true}
        spaceBetween={20}
        slidesPerView={1}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full">
              {/* Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-[300px] sm:h-[450px] md:h-[600px] lg:h-[750px] object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Text on image */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg mb-3">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl">
                  Join the{" "}
                  <span className="text-yellow-400 font-semibold">
                    Local Food Lovers Network
                  </span>{" "}
                  — share your taste, discover new dishes, and celebrate great
                  food together!
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
