import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";
import { IoRestaurant } from "react-icons/io5";
import { FaSearchLocation } from "react-icons/fa";

const ReviewCard = () => {
  const axiosInstance = useAxios();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/reviews?featured=true").then((data) => {
      setData(data.data);
    });
  }, [axiosInstance]);
  return (
    <div>
      <div className="text-center mb-3 mt-8">
        <h2 className="text-4xl font-bold text-gray-500">Featured Reviews</h2>
        <p className="text-lg text-gray-400 mt-2">
          See which local meals are winning hearts in our foodie community.Check out the best food experiences shared by our users.
        </p>
      </div>

      {
        //   "productId": "673b42c9a1d23f1234abcd56",
        //   "photo": "https://i.ibb.co/9NfV5KC/food1.jpg",
        //   "foodName": "Spicy Chicken Curry",
        //   "restaurantName": "Dhaka Dine",
        //   "restaurantLocation": "Banani, Dhaka",
        //   "reviewText": "Amazing food and great service!",
        //   "rating": 4.5,
        //   "reviewer_name": "Ashikur Rahman",
        //   "reviewer_email": "ashik@gmail.com"
      }

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((pet) => {
          return (
            <div key={pet.productId}>
              <div
                className="relative h-[390px] md:h-[470px] 2xl:h-[470px] rounded-3xl overflow-hidden shadow-md group "
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                {/* Background Image */}
                <img
                  src={pet.photo}
                  alt={pet.foodName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 right-4 ">
                  <div className="flex justify-between items-center">
                    <span className="bg-[#26563d] text-white px-1 rounded-lg flex items-center gap-1">
                    <IoRestaurant size={25} /> {pet.restaurantName}{" "}
                  </span>
                  <span className="bg-[#26563d] text-white px-1 rounded-lg flex items-center gap-1">
                    <FaSearchLocation size={25} />{pet.restaurantLocation}{" "}
                  </span>
                  </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                {/* Text Content */}
                <div
                  className="absolute bottom-6 left-6 right-6 text-white p-2.5 transition-transform duration-500 ease-in-out
                group-hover:-translate-y-5 group-hover:bg-stone-50 group-hover:rounded-xl "
                >
                  <h3 className="text-xl md:text-2xl 2xl:text-3xl font-semibold mb-2 fontBricolage group-hover:text-gray-600">
                    {pet.foodName}
                  </h3>
                  <p className="text-sm md:text-[15px] md:text-base text-gray-200 group-hover:text-gray-400 leading-snug mb-3">
                    {pet.description}
                  </p>
                  <div className="flex justify-between">
                    <span className="bg-[#26563da4] group-hover:bg-[#26563d]  px-1 rounded-lg">
                      {pet.reviewer_name}{" "}
                    </span>
                    <span className="bg-[#26563da4] group-hover:bg-[#26563d] px-1 rounded-lg">
                      Rating - {pet.rating}{" "}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 md:mt-3">
                    <Link className="px-3 md:px-5 py-1 md:py-2 bg-[#26563d] rounded-lg font-semibold group-hover:cursor-pointer">
                      View Details
                    </Link>
                    <Link className="px-3 md:px-5 py-1 md:py-2 outline rounded-lg font-semibold group-hover:cursor-pointer group-hover:bg-[#26563d]">
                      Show All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewCard;
