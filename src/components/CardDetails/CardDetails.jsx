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

  // Add modal
  const [addModal, setAddModal] = useState(false);
  const [newRating, setNewRating] = useState("");
  const [newText, setNewText] = useState("");
  const [addErr, setAddErr] = useState("");
  const [adding, setAdding] = useState(false);

  // ---------- Fetch recipe ----------
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/recipes");
        const found = data.find((r) => r._id === productId);
        if (found) setRecipe(found);
        else setError("Recipe not found!");
      } catch (e) {
        console.error(e);
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [axios, productId]);

  // ---------- Fetch reviews ----------
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

  // ---------- Add review ----------
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
      console.log(e);
      setAddErr("Failed to add review");
    } finally {
      setAdding(false);
    }
  };

  // ---------- Update review ----------
  const handleUpdate = async (reviewId, payload) => {
    await axios.patch(`/reviews/${reviewId}`, payload);
    await fetchReviews();
  };

  // ---------- Delete review ----------
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    await axios.delete(`/reviews/${reviewId}`);
    await fetchReviews();
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
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-green-800 font-semibold hover:text-green-600"
        >
          <IoArrowBack size={20} /> Go Back
        </button>

        {/* Layout */}
        <div className="md:flex md:items-start md:gap-10">
          {/* Image */}
          <div className="md:w-2/5 w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src={recipe.photo}
              alt={recipe.foodName}
              className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Details */}
          <div className="md:w-3/5 mt-6 md:mt-0 space-y-6">
            <RecipeInfo recipe={recipe} />

            {/* Reviews */}
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

        {/* Add button */}
        <AddReviewButton onClick={() => setAddModal(true)} />
      </div>

      {/* Add modal */}
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

      <footer />
    </>
  );
};

export default CardDetails;
