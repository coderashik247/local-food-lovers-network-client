import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../header/Navbar";
import RecipeInfo from "./RecipeInfo";
import ReviewList from "./ReviewList";
import AddReviewButton from "./AddReviewButton";
import AddReviewModal from "./AddReviewModal";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import CardDetailsSkeleton from "../Sekeletion/CardDetailsSkeleton";
import { IoArrowBack } from "react-icons/io5";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

const CardDetails = () => {
  const axios = useAxios();
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // ---------- State ----------
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Review Modal
  const [addModal, setAddModal] = useState(false);
  const [newRating, setNewRating] = useState("");
  const [newText, setNewText] = useState("");
  const [addErr, setAddErr] = useState("");
  const [adding, setAdding] = useState(false);

  // Edit Recipe Modal
  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [editError, setEditError] = useState("");
  const [editing, setEditing] = useState(false);

  // Check if current user is the recipe owner
  const isOwner = recipe?.creatorEmail === user?.email;

  // ---------- Fetch Recipe ----------
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/recipes");
        const found = data.find((r) => r._id === productId);
        if (found) {
          setRecipe(found);
          // Pre-fill edit modal
          setEditName(found.foodName);
          setEditLocation(found.restaurantLocation);
          setEditPhoto(found.photo);
        } else {
          setError("Recipe not found!");
        }
      } catch (e) {
        console.error(e);
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [axios, productId]);

  // ---------- Fetch Reviews ----------
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/reviews?recipeId=${productId}`);
      setReviews(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  // ---------- Add Review ----------
  const handleAdd = async () => {
    if (!newRating || !newText) return setAddErr("Both fields required");
    setAdding(true);
    try {
      await axios.post("/reviews", {
        recipe_id: productId,
        email: user?.email,
        name: user?.displayName,
        photo: user?.photoURL,
        rating: Number(newRating),
        review_text: newText,
      });
      await fetchReviews();
      setAddModal(false);
      setNewRating("");
      setNewText("");
      setAddErr("");
    } catch (e) {
      setAddErr("Failed to add review");
    } finally {
      setAdding(false);
    }
  };

  // ---------- Update Review ----------
  const handleUpdate = async (reviewId, payload) => {
    await axios.patch(`/reviews/${reviewId}`, payload);
    await fetchReviews();
  };

  // ---------- Delete Review ----------
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    await axios.delete(`/reviews/${reviewId}`);
    await fetchReviews();
  };

  // ---------- Update Recipe ----------
  const handleEditRecipe = async () => {
    if (!editName || !editLocation || !editPhoto) {
      return setEditError("All fields are required");
    }
    setEditing(true);
    try {
      await axios.patch(`/recipes/${productId}`, {
        foodName: editName,
        restaurantLocation: editLocation,
        photo: editPhoto,
      });
      const { data } = await axios.get("/recipes");
      const updated = data.find((r) => r._id === productId);
      setRecipe(updated);
      setEditModal(false);
      setEditError("");
    } catch (e) {
      setEditError("Failed to update recipe");
    } finally {
      setEditing(false);
    }
  };

  // ---------- Delete Recipe ----------
  const handleDeleteRecipe = async () => {
    if (
      !window.confirm("Delete this entire recipe? All reviews will be removed.")
    )
      return;
    try {
      await axios.delete(`/recipes/${productId}`);
      navigate("/"); // Redirect to home
    } catch (e) {
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
        <div>
          {" "}
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6 text-green-800 font-semibold hover:text-green-600"
          >
            <IoArrowBack size={20} /> Go Back
          </button>
          {/* Edit & Delete Recipe (Only Owner) */}
          {user.email === recipe.reviewer_email && (
            <div className="flex justify-end gap-3 mb-4">
              <button
                onClick={() => setEditModal(true)}
                className="text-green-600 hover:text-green-700 transition"
                title="Edit Recipe"
              >
                edit
                <FiEdit3 size={20} />
              </button>
              <button
                onClick={handleDeleteRecipe}
                className="text-red-600 hover:text-red-700 transition"
                title="Delete Recipe"
              >
                delete
                <FiTrash2 size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Recipe Layout */}
        <div className="md:flex md:items-start md:gap-10">
          {/* Recipe Image */}
          <div className="md:w-2/5 w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src={recipe.photo}
              alt={recipe.foodName}
              className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Recipe Details */}
          <div className="md:w-3/5 mt-6 md:mt-0 space-y-6">
            <RecipeInfo recipe={recipe} />

            {/* Reviews Section */}
            <section>
              <h3 className="text-2xl text-gray-800 font-semibold mb-4">
                Reviews
              </h3>
              <ReviewList
                reviews={reviews}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                currentUserEmail={user?.email}
                recipePhoto={recipe.photo}
              />
            </section>
          </div>
        </div>

        {/* Add Review Button */}
        <AddReviewButton onClick={() => setAddModal(true)} />
      </div>

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        rating={newRating}
        setRating={setNewRating}
        text={newText}
        setText={setNewText}
        onSubmit={handleAdd}
        submitting={adding}
        error={addErr}
      />

      {/* Edit Recipe Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Recipe</h2>
            {editError && <p className="text-red-500 mb-2">{editError}</p>}

            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Food Name"
              className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
              placeholder="Restaurant Location"
              className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={editPhoto}
              onChange={(e) => setEditPhoto(e.target.value)}
              placeholder="Photo URL"
              className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex gap-2">
              <button
                onClick={handleEditRecipe}
                disabled={editing}
                className={`bg-green-600 text-white px-4 py-2 rounded flex-1 transition ${
                  editing ? "opacity-50" : "hover:bg-green-700"
                }`}
              >
                {editing ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded flex-1 hover:bg-gray-600 transition"
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
