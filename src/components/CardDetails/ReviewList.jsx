import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({
  reviews,
  onUpdate,
  onDelete,
  currentUserEmail,
  recipePhoto,
}) => {
  if (!reviews || reviews.length === 0)
    return (
      <p className="text-gray-500 text-center py-6">
        No reviews yet. Be the first to add a review!
      </p>
    );

  return (
    <div className="space-y-6">
      {reviews.map((r) => (
        <ReviewItem
          key={r._id}
          review={{ ...r, recipePhoto }}
          onUpdate={onUpdate}
          onDelete={onDelete}
          currentUserEmail={currentUserEmail}
        />
      ))}
    </div>
  );
};

export default ReviewList;