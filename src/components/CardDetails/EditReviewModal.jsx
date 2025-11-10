import React, { useState } from "react";

const EditReviewModal = ({ review, onClose, onSave }) => {
  const [rating, setRating] = useState(review.rating);
  const [text, setText] = useState(review.review_text);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!rating || !text) {
      setError("Both fields are required!");
      return;
    }
    setSaving(true);
    try {
      await onSave(review._id, { rating: Number(rating), review_text: text });
      onClose();
    } catch (e) {
      console.log(e);
      setError("Failed to update review");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">Edit Review</h2>
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
          onClick={handleSave}
          disabled={saving}
          className={`bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500 transition w-full ${
            saving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditReviewModal;
