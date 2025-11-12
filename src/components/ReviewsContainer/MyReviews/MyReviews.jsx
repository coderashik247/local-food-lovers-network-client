import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Card from "../../Card/Card";
import Navbar from "../../header/Navbar";
import Footer from "../../Footer/Footer";

const MyReviews = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchMyRecipes();
    }
  }, [user]);

  const fetchMyRecipes = async () => {
    try {
      const { data } = await axios.get(`/reviews/email/${user.email}`);
      setRecipes(data);
    } catch (error) {
      console.error("Error loading my recipes:", error);
    }
  };

  return (
    <div className=" flex flex-col">
      <Navbar />

      {/*  Responsive Title Section */}
      <div className="text-center mt-10 mb-8 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">
          My Reviews
        </h1>
        <p className="text-gray-500 text-base sm:text-lg mt-3 max-w-xl mx-auto">
          Manage and view all the food reviews you’ve shared with the community.
        </p>
      </div>

      {/*  Reviews Grid */}
      <div className="flex-grow container mx-auto px-4">
        {recipes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-16">
            You haven’t added any reviews yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-16">
            {recipes.map((recipe) => (
              <Card key={recipe._id} recipes={recipe} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyReviews;
