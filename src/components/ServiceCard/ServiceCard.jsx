import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "../header/Container/Container";

// Images
import food1 from "../../assets/food_7.jpg";
import food2 from "../../assets/food_8.jpg";
import food3 from "../../assets/food_6.jpg";

const ServiceCard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Most Loved Dishes",
      img: food1,
      description:
        "Discover the top-rated food reviews shared by our community. Each review includes the dish, restaurant, location, reviewer, and rating.",
      button: "View Reviews",
      path: "/all-reviews",
    },
    {
      title: "Add Your Review",
      img: food2,
      description:
        "Share your own food experiences! Add a review with dish details, images, restaurant info, and your honest rating.location, reviewer, and rating",
      button: "Add Review",
      path: "/add-reviews",
    },
    {
      title: "My Favorites",
      img: food3,
      description:
        "Keep track of your favorite dishes and restaurants. Access all your saved favorite reviews in one place.location, reviewer, and rating",
      button: "View Favorites",
      path: "/favorite",
    },
  ];

  return (
    <Container>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-8">
        Explore Section
      </h1>
      <div className="grid md:grid-cols-3 gap-6 py-12">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <button
                onClick={() => navigate(card.path)}
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {card.button}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ServiceCard;
