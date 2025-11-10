import React from "react";

const RecipeInfo = ({ recipe }) => (
  <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">
      {recipe.foodName}
    </h2>
    <p className="text-gray-500">Restaurant: {recipe.restaurantLocation}</p>
    <p className="text-gray-500 mt-1">Average Rating: {recipe.rating}</p>
  </div>
);

export default RecipeInfo;