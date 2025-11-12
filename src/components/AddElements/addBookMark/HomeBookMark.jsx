import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Card from "../../Card/Card";

const HomeBookmark = () => {
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
      {/* ✅ Responsive Title */}
      <div className="py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-3">
            My Bookmarked Reviews
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            Easily access all the reviews you’ve bookmarked in one place.
          </p>
        </div>
      </div>

      {/* ✅ Cards Section */}
      <div className="mx-auto container px-4">
        {bookmarkedReviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-10">
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
    </>
  );
};

export default HomeBookmark;
