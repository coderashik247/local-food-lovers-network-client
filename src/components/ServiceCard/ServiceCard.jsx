import React, { useState } from "react";
import Container from "../header/Container/Container";
import "./card.css";

// Images
import food1 from "../../assets/food_7.jpg";
import food2 from "../../assets/food_8.jpg";
import food3 from "../../assets/food_6.jpg";

// Background Image
import bgImage from "../../assets/map.jpg";

const ServiceCard = () => {
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    if (!location) {
      alert("Please enter a location or zip code");
      return;
    }
    console.log("Searching for food near:", location);
    // এখানে তুমি API call করতে পারবে
  };

  const cards = [
    {
      title: "Featured Reviews",
      img: food1,
      description:
        "Discover the top-rated food reviews shared by our community. Each review includes the dish, restaurant, location, reviewer, and rating.",
      button: "View Reviews",
      bgColor: "#0C4428",
      btnColor: "#8DC53E",
    },
    {
      title: "Add Your Review",
      img: food2,
      description:
        "Share your own food experiences! Add a review with dish details, images, restaurant info, and your honest rating.",
      button: "Add Review",
      bgColor: "#0C4428",
      btnColor: "#8DC53E",
    },
    {
      title: "My Favorites",
      img: food3,
      description:
        "Keep track of your favorite dishes and restaurants. Access all your saved favorite reviews in one place.",
      button: "View Favorites",
      bgColor: "#0C4428",
      btnColor: "#8DC53E",
    },
  ];

  return (
    <div
      className="py-20 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      <Container>
        {/* Cards Section */}
        <h2 className="text-4xl font-bold text-white text-center mb-10 relative z-10">
          Explore Our Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 relative z-10">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-md cursor-pointer relative z-10"
            >
              <div className="flip-card w-full rounded-md">
                <div className="flip-card-inner rounded-md">
                  <div className="flip-card-front rounded-md">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="h-[300px] w-full object-cover rounded-md"
                    />
                  </div>
                  <div
                    className="flip-card-back rounded-md flex flex-col justify-center items-center text-lg p-10 text-white"
                    style={{ backgroundColor: card.bgColor }}
                  >
                    <p>{card.description}</p>
                  </div>
                </div>
              </div>

              <div className="text-center font-bold text-2xl pt-5 pb-10 relative">
                <p className="text-[#0C4428]">{card.title}</p>
                <button
                  className="px-4 py-2 text-base rounded-md font-semibold duration-200 absolute -bottom-5 left-1/2 -translate-x-1/2"
                  style={{ backgroundColor: card.btnColor }}
                  onClick={() => alert(`${card.title} button clicked`)}
                >
                  {card.button}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Find Food Section */}
        <section className="py-20 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-[#0C4428]">
              Find Food Restaurants Near You
            </h2>
            <p className="mt-4 text-lg text-white bg-[#26563d] inline-block px-4 py-2 rounded">
              Search our map to find free groceries and meals at a food pantry or
              program near you.
            </p>
          </div>

          {/* Search Box */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input
              type="text"
              placeholder="Enter your location or zip code"
              className="w-full md:w-1/2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8DC53E]"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              className="px-6 py-4 bg-[#8DC53E] text-white font-semibold rounded-md hover:bg-[#0C4428] transition-colors"
              onClick={handleSearch}
            >
              Find Food
            </button>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default ServiceCard;
