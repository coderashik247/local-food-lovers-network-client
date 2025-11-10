import React from "react";
import { Link } from "react-router-dom";
import { IoRestaurant } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

const Card = ({ review }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      {/* Image */}
      <div className="h-64 overflow-hidden">
        <img
          src={review.photo}
          alt={review.foodName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Restaurant & Location */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <IoRestaurant /> {review.restaurantName}
          </span>
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt /> {review.restaurantLocation}
          </span>
        </div>

        {/* Food Name */}
        <h3 className="text-lg font-semibold text-gray-800">
          {review.foodName}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {review.description}
        </p>

        {/* Reviewer & Rating */}
        <div className="flex justify-between text-sm text-gray-700">
          <span>{review.reviewer_name}</span>
          <span>⭐ {review.rating}</span>
        </div>

        {/* Actions */}
        <div className="mt-3 flex gap-2">
          <Link
            to={`/food-details/${review._id}`}
            className="flex-1 text-center bg-green-700 text-white px-3 py-2 rounded-md font-medium hover:bg-green-600 transition-colors"
          >
            View Details
          </Link>
          <Link
            to="/all-food"
            className="flex-1 text-center border border-gray-300 px-3 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Show All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
