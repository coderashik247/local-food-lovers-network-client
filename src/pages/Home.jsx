import React from "react";
import Navbar from "../components/header/Navbar";
import Slider from "../components/header/Slider";
import ServiceCard from "../components/ServiceCard/ServiceCard";
import TestimonialCard from "../components/TestimonialCard/TestimonialCard";
import AllHomeReviewsCard from "../components/ReviewsContainer/HomeRewiewsCard/HomeRewiewsCard";

const Home = () => {
  return (
    <>
      <div className="bg-[#a9ba2818]">
        <Navbar />
      </div>


        <div className="space-y-10">
          <Slider />
          <ServiceCard />
          <AllHomeReviewsCard />
          
          <TestimonialCard />
        </div>
    </>
  );
};

export default Home;
