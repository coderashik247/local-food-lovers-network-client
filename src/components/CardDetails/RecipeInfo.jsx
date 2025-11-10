import React from "react";

const RecipeInfo = ({ recipe }) => (
  <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
    <h2 className="text-xl font-semibold text-gray-800">{recipe.foodName}</h2>

    <p className="text-gray-600">
      <strong>Restaurant Name:</strong> {recipe.restaurantName}
    </p>
    <p className="text-gray-600">
      <strong>Location:</strong> {recipe.restaurantLocation}
    </p>
    <p className="text-gray-600">
      <strong>Rating:</strong> {recipe.rating} ⭐
    </p>
    <p className="text-gray-600">
      <strong>Review:</strong> {recipe.reviewText}
    </p>
    <p className="text-gray-600">
      <strong>Reviewer Name:</strong> {recipe.reviewer_name}
    </p>
    <p className="text-gray-600">
      <strong>Reviewer Email:</strong> {recipe.reviewer_email}
    </p>
    <p className="text-gray-600">
      <strong>Reviewed At:</strong>{" "}
      {new Date(recipe.createdAt).toLocaleString()}
    </p>
  </div>
);

export default RecipeInfo;
