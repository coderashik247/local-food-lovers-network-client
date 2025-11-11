import React from "react";
import { Leaf, Users, Heart, Utensils, Globe2 } from "lucide-react";
import Navbar from "../header/Navbar";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen flex flex-col">
      <Navbar />

      <section className="flex flex-col items-center text-center py-16 px-6">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="text-green-600 w-10 h-10" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800">
            About{" "}
            <span className="text-green-600">Local Food Lovers Network</span>
          </h2>
        </div>

        <p className="text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
          Welcome to <b>Local Food Lovers Network</b> — the community where
          passion for food meets connection! 🍲 We help food lovers share,
          explore, and celebrate authentic local flavors that tell the stories
          of their culture and community.
        </p>
      </section>

      {/* --- Mission Section --- */}
      <section className="bg-green-100 py-12 px-6 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <Utensils className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            Discover Local Tastes
          </h3>
          <p className="text-gray-700">
            Explore hidden gems, street food spots, and traditional recipes that
            define your community’s true flavor.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            Connect with Foodies
          </h3>
          <p className="text-gray-700">
            Join a vibrant network of food enthusiasts who share your passion
            for exploring and reviewing delicious dishes.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            Share with Love
          </h3>
          <p className="text-gray-700">
            Post reviews, add photos, and spread joy through the universal
            language of food and friendship.
          </p>
        </div>
      </section>

      {/* --- Vision Section --- */}
      <section className="py-16 px-6 text-center bg-gradient-to-b from-green-100 to-green-200">
        <Globe2 className="w-14 h-14 text-green-700 mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-green-800 mb-3">Our Vision</h3>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
          We dream of a world where local food connects people globally — where
          every bite tells a story and every recipe becomes a bridge between
          cultures. 🌍
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default About;
