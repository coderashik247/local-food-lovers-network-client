import React from 'react';
import Navbar from '../components/header/Navbar';
import Slider from '../components/header/Slider';
import ServiceCard from '../components/ServiceCard/ServiceCard';

const Home = () => {
    return (<>
        <div className="bg-[#a9ba2818]">
        <Navbar></Navbar>
      </div>
      <Slider></Slider>
      <ServiceCard></ServiceCard>
      </>
    );
};

export default Home;