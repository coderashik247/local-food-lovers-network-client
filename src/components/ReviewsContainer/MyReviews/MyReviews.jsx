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
      console.log("my reviews", data);
      setRecipes(data);
    } catch (error) {
      console.error("Error loading my recipes:", error);
    }
  };

  return (
    <div className="">
      <Navbar />
      <h1 className="text-2xl font-bold mb-6 text-center">My Reviews</h1>

      {recipes.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any recipes yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe._id} recipes={recipe} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MyReviews;
