import React from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Navbar from "../../header/Navbar";
import Footer from "../../Footer/Footer";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddReview = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      await axiosInstance.post("/reviews", {
        ...formData,
        rating: parseFloat(formData.rating),
        reviewer_email: user?.email,
        reviewer_name: user?.displayName,
        reviewer_photo: user?.photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Review Added!",
        text: "Your review has been successfully added.",
      });

      reset();
      navigate("/all-reviews");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to add review. Please try again.",
      });
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Food Name</label>
              <input
                type="text"
                placeholder="Enter food name"
                {...register("foodName", { required: "Food name is required" })}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.foodName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.foodName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Food Image URL</label>
              <input
                type="text"
                placeholder="Enter image URL"
                {...register("photo", { required: "Image URL is required" })}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Restaurant Name
              </label>
              <input
                type="text"
                placeholder="Enter restaurant name"
                {...register("restaurantName", {
                  required: "Restaurant name is required",
                })}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.restaurantName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.restaurantName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                {...register("restaurantLocation", {
                  required: "Location is required",
                })}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.restaurantLocation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.restaurantLocation.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Enter rating"
                {...register("rating", {
                  required: "Rating is required",
                  min: { value: 0, message: "Minimum rating is 0" },
                  max: { value: 5, message: "Maximum rating is 5" },
                })}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Review Text</label>
              <textarea
                rows={4}
                placeholder="Write your review"
                {...register("reviewText", {
                  required: "Review text is required",
                })}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.reviewText && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reviewText.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-500 transition-colors"
            >
              {isSubmitting ? "Adding..." : "Add Review"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddReview;
