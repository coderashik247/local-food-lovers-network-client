import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "../header/Navbar";
import RecipeInfo from "./RecipeInfo";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import CardDetailsSkeleton from "../Sekeletion/CardDetailsSkeleton";
import { IoArrowBack } from "react-icons/io5";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { FaThumbsUp, FaRegThumbsUp, FaHeart, FaRegHeart } from "react-icons/fa";

const CardDetails = () => {
  const axios = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // ---------- Edit Modal State ----------
  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [editError, setEditError] = useState("");

  // ---------- Fetch Recipe ----------
  const {
    data: recipe,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const { data } = await axios.get(`/reviews/${id}`);
      // Pre-fill edit form
      setEditName(data.foodName);
      setEditLocation(data.restaurantLocation);
      setEditPhoto(data.photo);
      return data;
    },
    enabled: !!id,
  });

  // ---------- Mutations ----------
  const mutationOptions = {
    onSuccess: (data) => {
      queryClient.setQueryData(["recipe", id], data);
      queryClient.invalidateQueries(["recipes"]); // Optional: if list exists
    },
    onError: (err) => {
      alert(err.response?.data?.error || "Operation failed");
    },
  };

  // Like Mutation
  const likeMutation = useMutation({
    mutationFn: () =>
      axios.patch(`/reviews-likes/${id}`, { userEmail: user.email }),
    ...mutationOptions,
  });

  // Bookmark Mutation
  const bookmarkMutation = useMutation({
    mutationFn: () =>
      axios.patch(`/reviews/${id}/bookmark`, { userEmail: user.email }),
    ...mutationOptions,
  });

  // Edit Mutation
  const editMutation = useMutation({
    mutationFn: () =>
      axios.patch(`/reviews/${id}`, {
        foodName: editName,
        restaurantLocation: editLocation,
        photo: editPhoto,
      }),
    onSuccess: () => {
      setEditModal(false);
      setEditError("");
    },
    onError: () => {
      setEditError("Failed to update recipe");
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: () => axios.delete(`/reviews/${id}`),
    onSuccess: () => {
      navigate("/");
    },
  });

  // ---------- Handlers ----------
  const handleLike = () => {
    if (!user || isOwner || recipe?.likedBy?.includes(user.email)) return;
    likeMutation.mutate();
  };

  const handleBookmark = () => {
    if (!user || isOwner) return;
    bookmarkMutation.mutate();
  };

  const handleEdit = () => {
    if (!editName || !editLocation || !editPhoto) {
      return setEditError("All fields are required");
    }
    editMutation.mutate();
  };

  const handleDelete = () => {
    if (window.confirm("Delete this recipe permanently?")) {
      deleteMutation.mutate();
    }
  };

  // ---------- Derived ----------
  const isOwner = recipe?.reviewer_email === user?.email;
  const liked = recipe?.likedBy?.includes(user?.email);
  const bookmarked = recipe?.bookmarkedBy?.includes(user?.email);

  // ---------- Render ----------
  if (isLoading) return <CardDetailsSkeleton />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500 font-medium">
        {error?.message || "Failed to load recipe"}
      </p>
    );
  if (!recipe)
    return <p className="text-center mt-10 text-gray-600">No recipe found.</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-green-800 font-semibold hover:text-green-600 transition-colors"
        >
          <IoArrowBack size={20} /> Go Back
        </button>

        {/* Owner Actions */}
        {isOwner && (
          <div className="flex justify-end gap-3 mb-4">
            <button
              onClick={() => setEditModal(true)}
              className="text-green-600 hover:text-green-700 transition-colors"
              title="Edit"
            >
              <FiEdit3 size={20} />
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
              title="Delete"
            >
              <FiTrash2 size={20} />
            </button>
          </div>
        )}

        {/* Recipe Layout */}
        <div className="md:flex md:items-start md:gap-10">
          {/* Image Section */}
          <div className="md:w-2/5 w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative">
            <img
              src={recipe.photo}
              alt={recipe.foodName}
              className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
            />

            {/* Like Button */}
            <button
              onClick={handleLike}
              disabled={!user || isOwner || liked || likeMutation.isPending}
              className={`absolute top-6 right-6 p-3 rounded-full shadow-md transition-all duration-300 ${
                liked
                  ? "bg-blue-600 text-white"
                  : "bg-white bg-opacity-80 text-gray-700 hover:bg-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={liked ? "Already liked" : "Like this recipe"}
            >
              {liked ? (
                <FaThumbsUp className="text-xl animate-pulse" />
              ) : (
                <FaRegThumbsUp className="text-xl hover:text-blue-600 transition-colors" />
              )}
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              disabled={!user || isOwner || bookmarkMutation.isPending}
              className={`absolute top-3 left-3 p-3 rounded-full shadow-md transition-all duration-300 ${
                bookmarked
                  ? "bg-red-500 text-white"
                  : "bg-white bg-opacity-80 text-gray-700 hover:bg-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={bookmarked ? "Bookmarked" : "Bookmark this recipe"}
            >
              {bookmarked ? (
                <FaHeart className="text-xl animate-pulse" />
              ) : (
                <FaRegHeart className="text-xl hover:text-red-500 transition-colors" />
              )}
            </button>

            {/* Likes Count */}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full shadow flex items-center gap-1 text-sm font-medium">
              <FaThumbsUp className="text-blue-600 text-xs" />
              <span>{recipe.likes || 0}</span>
            </div>

            {/* Bookmark Count (Optional) */}
            {recipe.bookmarks > 0 && (
              <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full shadow flex items-center gap-1 text-sm font-medium">
                <FaHeart className="text-red-500 text-xs" />
                <span>{recipe.bookmarks}</span>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="md:w-3/5 mt-6 md:mt-0 space-y-6">
            <RecipeInfo recipe={recipe} />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>
            {editError && (
              <p className="text-red-500 mb-3 text-sm">{editError}</p>
            )}

            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Food Name"
              className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <input
              type="text"
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
              placeholder="Restaurant Location"
              className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <input
              type="url"
              value={editPhoto}
              onChange={(e) => setEditPhoto(e.target.value)}
              placeholder="Photo URL"
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />

            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                disabled={editMutation.isPending}
                className={`flex-1 bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium transition ${
                  editMutation.isPending
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-700"
                }`}
              >
                {editMutation.isPending ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => {
                  setEditModal(false);
                  setEditError("");
                }}
                className="flex-1 bg-gray-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardDetails;
