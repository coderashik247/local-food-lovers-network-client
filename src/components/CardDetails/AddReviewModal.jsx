import React from "react";

const AddReviewModal = ({
  isOpen,
  onClose,
  rating,
  setRating,
  text,
  setText,
  onSubmit,
  submitting,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">Add Your Review</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Review</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={onSubmit}
          disabled={submitting}
          className={`bg-green-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition w-full ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AddReviewModal;