import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Card from "../../Card/Card";
import Footer from "../../Footer/Footer";
import Navber from "../../header/Navbar";

const AllReviewsCard = () => {
  const axiosInstance = useAxios();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/all-recipes").then((data) => {
      setData(data.data);
    });
  }, [axiosInstance]);
  return (
    <>
      <Navber />
      <div className="mx-auto container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
          {data.map((recipes) => {
            return <Card key={recipes._id} recipes={recipes}></Card>;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllReviewsCard;
