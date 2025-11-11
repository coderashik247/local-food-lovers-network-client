import React from "react";

const RecipeInfo = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className=" mx-auto p-6 rounded-2xl shadow-lg border border-gray-100  from-white to-gray-50">
      {/* Reviewer Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
          <img
            src={recipe.reviewer_photo}
            alt={recipe.reviewer_name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {recipe.reviewer_name}
          </h2>
          <p className="text-sm text-gray-500">{recipe.reviewer_email}</p>
        </div>
      </div>

      {/* Recipe Info */}
      <div className="space-y-4">
        <p className="text-gray-700 font-medium">
          🍽 Food Name: <span className="font-normal">{recipe.foodName}</span>
        </p>
        <p className="text-gray-700 font-medium">
          🏠 Restaurant:{" "}
          <span className="font-normal">{recipe.restaurantName}</span>
        </p>
        <p className="text-gray-700 font-medium">
          📍 Location:{" "}
          <span className="font-normal">{recipe.restaurantLocation}</span>
        </p>
        <p className="text-gray-700 font-medium">
          ⭐ Rating: <span className="font-normal">{recipe.rating}</span>
        </p>
        <p className="text-gray-700 font-medium">
          👍 Likes: <span className="font-normal">{recipe.likes}</span>
        </p>
        <p className="text-gray-700 font-medium">
          📝 Review: <span className="font-normal">{recipe.reviewText}</span>
        </p>

        <p className="text-xs text-gray-500 text-right">
          Posted on {new Date(recipe.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default RecipeInfo;
