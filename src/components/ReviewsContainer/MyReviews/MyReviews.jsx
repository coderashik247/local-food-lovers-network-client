import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"; // ধরে নিচ্ছি useAuth দিয়ে user info নিচ্ছো
import useAxios from "../hooks/useAxios";
import Card from "../components/Card"; // তোমার আগের Card component

const MyRecipes = () => {
  const { user } = useAuth(); // logged-in user
  const axios = useAxios();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchMyRecipes();
    }
  }, [user]);

  const fetchMyRecipes = async () => {
    try {
      const { data } = await axios.get(`/my-recipes/${user.email}`);
      setRecipes(data);
    } catch (error) {
      console.error("Error loading my recipes:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">My Recipes</h1>

      {recipes.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t added any recipes yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe._id} recipes={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
