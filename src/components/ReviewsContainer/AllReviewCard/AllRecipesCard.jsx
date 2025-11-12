import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Card from "../../Card/Card";
import Footer from "../../Footer/Footer";
import Navber from "../../header/Navbar";

const AllReviewsCard = () => {
  const axiosInstance = useAxios();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch data (with search filter)
  const fetchReviews = async (query = "") => {
    try {
      const { data } = await axiosInstance.get(
        `/all-reviews?search=${encodeURIComponent(query)}`
      );
      setData(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    fetchReviews(search.trim());
  };

  return (
    <>
      <Navber />

      {/* Search Bar */}
      <div className=" py-8">
        <div className="container mx-auto px-4">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <input
              type="text"
              placeholder="Search by foodName name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full sm:w-1/2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="btn bg-green-600 hover:bg-green-700 text-white px-6"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto container">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
            {data.map((recipes) => (
              <Card key={recipes._id} recipes={recipes} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10 text-lg">
            No reviews found.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default AllReviewsCard;
