import React from "react";
import user from "../../assets/user.jpg";
import quote from "../../assets/quote.svg";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const testimonials = [
  {
    name: "Sadia Karim",
    role: "Food Enthusiast",
    img: user,
    rating: 5,
    text: "The Beef Tehari from Kacchi Ghor was simply outstanding! Tender meat, perfect spice, and a memorable taste.",
  },
  {
    name: "Rafiul Hasan",
    role: "Food Reviewer",
    img: user,
    rating: 4,
    text: "Cheesy Pizza from Pizza House is a delight. Crispy crust, gooey cheese, and just the right toppings!",
  },
  {
    name: "Nusrat Jahan",
    role: "Food Blogger",
    img: user,
    rating: 5,
    text: "Grilled Salmon from Seafood Station is fresh and perfectly cooked. Loved the presentation and flavors!",
  },
];

const TestimonialCard = () => {
  const ratingStyle = {
    itemShapes: Star,
    activeFillColor: "#26563D", // theme color
    inactiveFillColor: "#D1D5DB",
  };

  return (
    <>
      <div className="text-center mb-3 mt-8">
        <h2 className="text-4xl font-bold text-gray-500">What Our Users Say</h2>
        <p className="text-lg text-gray-400 mt-2">
          Hear from our community about their favorite local foods and
          experiences.
        </p>
      </div>

      <div className="overflow-x-hidden relative py-8">
        <div className="flex animate-marquee gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="min-w-[350px] max-w-[550px] p-6 border border-[#E8E8E8] rounded-md space-y-4 bg-white shadow-md shrink-0"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-[60px] h-[60px] rounded-full"
                  />
                  <div>
                    <p className="text-[#444] text-[20px] font-bold">
                      {t.name}
                    </p>
                    <p className="text-[#737373] text-sm font-semibold">
                      {t.role}
                    </p>
                  </div>
                </div>
                <img src={quote} alt="quote" className="w-8 h-8" />
              </div>
              <p className="text-[#555] text-base">{t.text}</p>
              <Rating
                style={{ maxWidth: 140 }}
                value={t.rating}
                itemStyles={ratingStyle}
                readOnly
              />
            </div>
          ))}
          {/* Duplicate cards for seamless loop */}
          {testimonials.map((t, idx) => (
            <div
              key={"dup-" + idx}
              className="min-w-[350px] max-w-[550px] p-6 border border-[#E8E8E8] rounded-md space-y-4 bg-white shadow-md shrink-0"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-[60px] h-[60px] rounded-full"
                  />
                  <div>
                    <p className="text-[#444] text-[20px] font-bold">
                      {t.name}
                    </p>
                    <p className="text-[#737373] text-sm font-semibold">
                      {t.role}
                    </p>
                  </div>
                </div>
                <img src={quote} alt="quote" className="w-8 h-8" />
              </div>
              <p className="text-[#555] text-base">{t.text}</p>
              <Rating
                style={{ maxWidth: 140 }}
                value={t.rating}
                itemStyles={ratingStyle}
                readOnly
              />
            </div>
          ))}
        </div>

        {/* Tailwind keyframes animation */}
        <style>
          {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            gap: 2rem;
            animation: marquee 25s linear infinite;
          }
        `}
        </style>
      </div>
    </>
  );
};

export default TestimonialCard;
