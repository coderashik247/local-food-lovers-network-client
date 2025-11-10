// ReviewItem.jsx
import React, { useState } from "react";
import EditReviewModal from "./EditReviewModal";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

const ReviewItem = ({ review, onUpdate, onDelete, currentUserEmail }) => {
  const [editOpen, setEditOpen] = useState(false);
  const isOwner = review.email === currentUserEmail;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 flex flex-col md:flex-row md:justify-between items-start gap-6 hover:shadow-xl transition-shadow duration-300">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={review.photo}
          alt={review.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-green-700"
        />
      </div>

      {/* Review Content */}
      <div className="flex-1 flex flex-col">
        <div className="mb-2">
          <p className="text-gray-800 font-semibold text-lg">{review.name}</p>
          <p className="text-gray-500 text-sm">{review.email}</p>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-500 text-sm">Rating:</span>
          <span className="text-yellow-500 font-medium text-sm">
            {"★".repeat(review.rating)}
          </span>
        </div>

        <p className="text-gray-700 text-md leading-relaxed">
          {review.review_text}
        </p>
      </div>

      {/* Edit/Delete buttons at the end */}
      {isOwner && (
        <div className="flex flex-shrink-0 gap-3 mt-2 md:mt-0">
          <button
            onClick={() => setEditOpen(true)}
            className="text-green-600 hover:text-green-700 transition"
            title="Edit Review"
          >
            <FiEdit3 size={20} />
          </button>
          <button
            onClick={() => onDelete(review._id)}
            className="text-red-600 hover:text-red-700 transition"
            title="Delete Review"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editOpen && (
        <EditReviewModal
          review={review}
          onClose={() => setEditOpen(false)}
          onSave={onUpdate}
        />
      )}
    </div>
  );
};

export default ReviewItem;
