import React from "react";

const AddReviewButton = ({ onClick }) => (
  <div className="flex items-center justify-center my-8">
    <button
      onClick={onClick}
      className="bg-green-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition"
    >
      Add  Review comments
    </button>
  </div>
);

export default AddReviewButton;