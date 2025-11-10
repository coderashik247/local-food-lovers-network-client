import React from 'react';
import Navbar from '../components/header/Navbar';
import Slider from '../components/header/Slider';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import TestimonialCard from '../components/TestimonialCard/TestimonialCard';

const Home = () => {
    return (<>
        <div className="bg-[#a9ba2818]">
        <Navbar></Navbar>
      </div>
      <Slider></Slider>
      <ServiceCard></ServiceCard>
      <TestimonialCard></TestimonialCard>
      </>
    );
};

export default Home;