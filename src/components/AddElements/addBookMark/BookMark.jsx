import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Card from "../../Card/Card";
import Navbar from "../../header/Navbar";
import Footer from "../../Footer/Footer";

const BookmarkedReviews = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [bookmarkedReviews, setBookmarkedReviews] = useState([]);

  // Fetch bookmarked reviews
  const fetchBookmarkedReviews = async () => {
    if (!user?.email) return;

    try {
      const { data } = await axiosInstance.get(
        `/reviews/bookmarked/${user.email}`
      );
      setBookmarkedReviews(data);
    } catch (error) {
      console.error("Failed to fetch bookmarked reviews:", error);
    }
  };

  useEffect(() => {
    fetchBookmarkedReviews();
  }, [user?.email]);

  return (
    <>
      <Navbar />

      {/* Title */}
      <div className=" py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold ">My Bookmarked Reviews</h2>
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto container">
        {bookmarkedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
            {bookmarkedReviews.map((review) => (
              <Card key={review._id} recipes={review} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10 text-lg">
            You have no bookmarked reviews.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default BookmarkedReviews;
