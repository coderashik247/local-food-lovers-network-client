import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Navbar from "../../header/Navbar";
import Footer from "../../Footer/Footer";
import useAuth from "../../../hooks/useAuth";

const AddReview = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [foodName, setFoodName] = useState("");
  const [photo, setPhoto] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const user_email = user?.email;
    const user_name = user?.displayName;
    const user_photo = user?.photoURL;

    try {
      await axiosInstance.post("/reviews", {
        foodName,
        photo,
        restaurantName,
        restaurantLocation: location,
        rating: parseFloat(rating),
        reviewText,
        reviewer_email: user_email,
        reviewer_name: user_name,
        reviewer_photo: user_photo,
      });
      navigate("/all-reviews");
    } catch (err) {
      console.error(err);
      setError("Failed to add review!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Add New Review
          </h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Food Name</label>
              <input
                type="text"
                placeholder="Enter food name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Food Image URL</label>
              <input
                type="text"
                placeholder="Enter image URL"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Restaurant Name
              </label>
              <input
                type="text"
                placeholder="Enter restaurant name"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Enter rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Review Text</label>
              <textarea
                placeholder="Write your review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-500 transition-colors"
            >
              {loading ? "Adding..." : "Add Review"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddReview;
