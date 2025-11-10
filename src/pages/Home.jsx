import React from 'react';
import Navbar from '../components/header/Navbar';
import Slider from '../components/header/Slider';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import TestimonialCard from '../components/TestimonialCard/TestimonialCard';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import Container from '../components/header/Container/Container';

const Home = () => {
    return (<>
        <div className="bg-[#a9ba2818]">
        <Navbar></Navbar>
      </div>
      <Slider></Slider>
      <ServiceCard></ServiceCard>
      <Container><ReviewCard></ReviewCard></Container>
      <TestimonialCard></TestimonialCard>
      </>
    );
};

export default Home;