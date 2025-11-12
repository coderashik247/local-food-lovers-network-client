import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Card from "../../Card/Card";
import { Link } from "react-router";

const AllHomeReviewsCard = () => {
  const axiosInstance = useAxios();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("all-reviews/like").then((data) => {
      setData(data.data);
    });
  }, [axiosInstance]);

  return (
    <div className="mx-auto container px-4">
      {/* ✅ Section Title */}
      <div className="text-center mb-8 mt-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black  bg-clip-text">
          Featured Recipes
        </h1>
        <p className="text-base sm:text-lg text-gray-500 mt-3 max-w-2xl mx-auto">
          See which local meals are winning hearts in our foodie community.{" "}
          <br />
          Check out the best food experiences shared by our users.
        </p>
      </div>

      {/* ✅ Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((recipes) => (
          <Card key={recipes._id} recipes={recipes} />
        ))}
      </div>

      {/* ✅ Button */}
      <div className="text-center">
        <Link to="/all-reviews">
          <button className="mt-10 px-6 py-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
            See All Recipes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AllHomeReviewsCard;
