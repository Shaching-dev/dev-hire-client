import React from "react";

import dev1 from "../../../assets/developer/team-1.webp";
import dev2 from "../../../assets/developer/team-2.webp";
import dev3 from "../../../assets/developer/team-3.webp";
import dev4 from "../../../assets/developer/team-4.webp";
import dev5 from "../../../assets/developer/team-5.webp";
import dev6 from "../../../assets/developer/team-6.webp";
import dev7 from "../../../assets/developer/team-7.webp";
import dev8 from "../../../assets/developer/team-8.webp";
import { FaRegStar } from "react-icons/fa";
import StarRating from "../../../utils/StarRating/StarRating";

const Hire = () => {
  const talents = [
    {
      name: "Kr. Shaurya Preet",
      rating: 4.6,
      role: "Sr. Web Designer",
      perHour: "70/hr",
      experience: 5,
      image: dev1,
    },
    {
      name: "Monisha Patel",
      rating: 4,
      role: "React Developer",
      perHour: "30/hr",
      experience: 5,
      image: dev2,
    },
    {
      name: "Amie L. Brown",
      rating: 4.9,
      role: "Sr. Web Designer",
      perHour: "70/hr",
      experience: 5,
      image: dev3,
    },
    {
      name: "Darrel T. Turner",
      rating: 4.4,
      role: "Sr. Web Designer",
      perHour: "70/hr",
      experience: 5,
      image: dev4,
    },
    {
      name: "Michael B. Arellano",
      rating: 4.7,
      role: "Sr. Web Designer",
      perHour: "70/hr",
      experience: 5,
      image: dev5,
    },
    {
      name: "Kum K. Sellers",
      rating: 4.8,
      role: "Sr. Web Designer",
      perHour: "70/hr",
      experience: 5,
      image: dev6,
    },
    {
      name: "Debbie W. Wilson",
      rating: 5,
      role: "Sr. Web Designer",
      perHour: "70/hr",
      experience: 5,
      image: dev7,
    },
    {
      name: "Peggy J. Arnold",
      rating: 4.6,
      role: "Sr. Web Designer",
      perHour: "70/hr",
      image: dev8,
    },
  ];

  return (
    <div className="bg-gray-200 my-5 py-10">
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold md:font-bold text-center my-10">
        Hire Talents & Experts
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 py-3">
        {talents.map((talent, index) => (
          <div key={index} className="bg-white/50 rounded-2xl ">
            <div className=" flex flex-col justify-center items-center">
              <img className="w-20 rounded-full" src={talent.image} alt="" />
              <h3 className="flex items-center gap-5">
                <StarRating rating={talent.rating} />
                <span className="font-semibold">{talent.rating}</span>
              </h3>
              <h3 className="font-semibold">{talent.name}</h3>
              <p className="text-green-600">{talent.role}</p>
            </div>
            <div className="flex justify-between px-10">
              <span>{talent.perHour}</span>
              <span>{talent.experience}</span>
            </div>
            <div className="text-center px-3 my-3">
              <button className="btn w-full bg-gray-100 border-2 border-gray-300 outline-0 rounded-3xl hover:border-green-500 hover:text-green-500 duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hire;
