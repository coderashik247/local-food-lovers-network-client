import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";

import Card from "../../Card/Card";

const AllHomeReviewsCard = () => {
  const axiosInstance = useAxios();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/reviews?featured=true").then((data) => {
      setData(data.data);
    });
  }, [axiosInstance]);
  return (
    <div className="mx-auto container">
      <div className="text-center mb-3 mt-8">
        <h2 className="text-4xl font-bold text-gray-500">Featured Reviews</h2>
        <p className="text-lg text-gray-400 mt-2">
          See which local meals are winning hearts in our foodie community.Check out the best food experiences shared by our users.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((review) => 
        {
           return <Card key={review._id} review={review}></Card>
        })}
      </div>
    </div>
  );
};

export default AllHomeReviewsCard




