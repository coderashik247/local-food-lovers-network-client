import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../header/Navbar";
import RecipeInfo from "./RecipeInfo";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import CardDetailsSkeleton from "../Sekeletion/CardDetailsSkeleton";
import { IoArrowBack } from "react-icons/io5";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CardDetails = () => {
  const axios = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // ---------- State ----------
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit Modal State
  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [editError, setEditError] = useState("");
  const [editing, setEditing] = useState(false);

  // Like State
  const [liked, setLiked] = useState(false);

  // Check ownership
  const isOwner = recipe?.reviewer_email === user?.email;

  // ---------- Fetch Recipe ----------
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError("");
        const { data } = await axios.get(`/reviews/${id}`);
        setRecipe(data);

        // Pre-fill edit form
        setEditName(data.foodName);
        setEditLocation(data.restaurantLocation);
        setEditPhoto(data.photo);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, axios]);

  // ---------- Update Like Status ----------
  useEffect(() => {
    if (recipe && user?.email) {
      const hasLiked = recipe.likedBy?.includes(user.email);
      setLiked(hasLiked);
    } else {
      setLiked(false);
    }
  }, [recipe, user]);

  // ---------- Handle Like (Only Like, No Unlike) ----------
  const handleLike = async () => {
    if (!user || liked || isOwner) return;

    try {
      const { data } = await axios.patch(`/reviews-likes/${id}`, {
        userEmail: user.email,
      });

      setRecipe(data); // Update recipe with new likes & likedBy
    } catch (err) {
      console.error("Like failed:", err);
      alert(err.response?.data?.error || "Failed to like");
    }
  };

  // ---------- Handle Edit ----------
  const handleEditRecipe = async () => {
    if (!editName || !editLocation || !editPhoto) {
      return setEditError("All fields are required");
    }

    setEditing(true);
    try {
      const { data } = await axios.patch(`/reviews/${id}`, {
        foodName: editName,
        restaurantLocation: editLocation,
        photo: editPhoto,
      });

      setRecipe(data);
      setEditModal(false);
      setEditError("");
    } catch (err) {
      setEditError("Failed to update recipe");
    } finally {
      setEditing(false);
    }
  };

  // ---------- Handle Delete ----------
  const handleDeleteRecipe = async () => {
    if (!window.confirm("Delete this recipe permanently?")) return;

    try {
      await axios.delete(`/reviews/${id}`);
      navigate("/");
    } catch (err) {
      alert("Failed to delete recipe");
    }
  };

  // ---------- Render ----------
  if (loading) return <CardDetailsSkeleton />;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-medium">{error}</p>
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
              onClick={handleDeleteRecipe}
              className="text-red-600 hover:text-red-700 transition-colors"
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

            {/* Like Button - Only Like, No Unlike */}
            <button
              onClick={handleLike}
              disabled={!user || isOwner || liked}
              className={`absolute top-6 right-6 p-3 rounded-full shadow-md transition-all duration-300 ${
                liked
                  ? "bg-red-500 text-white cursor-not-allowed"
                  : "bg-white bg-opacity-80 text-gray-700 hover:bg-red-500 hover:text-white"
              } disabled:opacity-100`}
              title={liked ? "Already liked" : "Like this recipe"}
            >
              {liked ? (
                <FaHeart className="text-xl animate-pulse" />
              ) : (
                <FaRegHeart className="text-xl" />
              )}
            </button>

            {/* Likes Count */}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full shadow flex items-center gap-1 text-sm font-medium">
              <FaHeart className="text-red-500 text-xs" />
              <span>{recipe.likes || 0}</span>
            </div>
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
                onClick={handleEditRecipe}
                disabled={editing}
                className={`flex-1 bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium transition ${
                  editing
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-700"
                }`}
              >
                {editing ? "Saving..." : "Save Changes"}
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