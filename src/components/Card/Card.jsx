import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Card = ({ recipes }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white">
      {/* ---------- Image ---------- */}
      <div className="h-64 overflow-hidden relative">
        <img
          src={recipes.photo}
          alt={recipes.foodName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />

        {/* Likes */}
        <div className="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded-full flex items-center gap-1 text-sm text-gray-700 shadow">
          <FaHeart className="text-red-500" /> {recipes.likes || 0}
        </div>
      </div>

      {/* ---------- Content ---------- */}
      <div className="p-4 space-y-3">
        {/* Food Name */}
        <h3 className="text-lg font-semibold text-gray-800">
          {recipes.foodName}
        </h3>
        {/* Avatar + Name */}
        <div className="flex items-center gap-3">
          <img
            src={recipes.reviewer_photo}
            alt={recipes.reviewer_name}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <span className="text-gray-800 font-medium">
            {recipes.reviewer_name}
          </span>
        </div>

        {/* View Details Button */}
        <Link
          to={`/food-details/${recipes._id}`}
          className="block text-center bg-green-700 text-white px-3 py-2 rounded-md font-medium hover:bg-green-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
