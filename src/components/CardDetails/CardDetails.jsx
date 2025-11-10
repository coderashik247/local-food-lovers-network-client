import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../header/Navbar";
import { IoArrowBack } from "react-icons/io5";
import CardDetailsSkeleton from "../Sekeletion/CardDetailsSkeleton";

const CardDetails = () => {
  const axiosInstance = useAxios();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRating, setNewRating] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/reviews/${productId}`);
        setReviewData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch review data!");
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [axiosInstance, productId]);

  const handleSubmitReview = async () => {
    if (!newRating || !newReviewText) {
      setSubmitError("Both fields are required!");
      return;
    }

    try {
      await axiosInstance.post(`/reviews/${productId}`, {
        rating: newRating,
        reviewText: newReviewText,
      });
      // Refetch updated review
      const response = await axiosInstance.get(`/reviews/${productId}`);
      setReviewData(response.data);
      setIsModalOpen(false);
      setNewRating("");
      setNewReviewText("");
      setSubmitError("");
    } catch (err) {
      console.error(err);
      setSubmitError("Failed to submit review!");
    }
  };

  if (loading) return <CardDetailsSkeleton />;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-medium">{error}</p>
    );
  if (!reviewData)
    return (
      <p className="text-center mt-10 text-gray-600 font-medium">
        No review found.
      </p>
    );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-green-800 font-semibold hover:text-green-600"
        >
          <IoArrowBack size={20} /> Go Back
        </button>

        <div className="md:flex md:items-start md:gap-10">
          {/* Image */}
          <div className="md:w-2/5 w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src={reviewData.photo}
              alt={reviewData.foodName}
              className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Details */}
          <div className="md:w-3/5 mt-6 md:mt-0 space-y-6">
            {/* Reviewer Info */}
            <div className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center flex-wrap gap-4 border border-gray-100">
              <div className="flex items-center gap-4">
                <img
                  src={reviewData.photo}
                  alt={reviewData.reviewer_name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-green-700"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {reviewData.reviewer_name}
                  </h2>
                  <p className="text-gray-500 text-sm">Donator</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Location</p>
                <h3 className="text-gray-800 font-medium">
                  {reviewData.restaurantLocation}
                </h3>
              </div>
            </div>

            {/* Food Info */}
            <div className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center flex-wrap gap-4 border border-gray-100">
              <div>
                <p className="text-gray-500 text-sm">Food Name</p>
                <h3 className="text-gray-800 font-medium">
                  {reviewData.foodName}
                </h3>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Rating</p>
                <h3 className="text-gray-800 font-medium">
                  {reviewData.rating}
                </h3>
              </div>
            </div>

            {/* Review Text */}
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
              <h3 className="text-gray-800 font-semibold mb-2">Review</h3>
              <p className="text-gray-700 leading-relaxed">
                {reviewData.reviewText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Review Button */}
      <div className="flex items-center justify-center mb-12">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition"
        >
          Add Review
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-4">Add Your Review</h2>
            {submitError && <p className="text-red-500 mb-2">{submitError}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Rating
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={newRating}
                onChange={(e) => setNewRating(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Review
              </label>
              <textarea
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={handleSubmitReview}
              className="bg-green-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition w-full"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CardDetails;
