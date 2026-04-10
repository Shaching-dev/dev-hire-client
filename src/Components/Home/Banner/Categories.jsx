import React from "react";
import {
  FaCaravan,
  FaChalkboardTeacher,
  FaFileAlt,
  FaPlane,
  FaUserGraduate,
} from "react-icons/fa";
import Container from "../../Container/Container";
import { BsBagPlusFill, BsFillTelephoneFill } from "react-icons/bs";
import { PiBowlFoodDuotone } from "react-icons/pi";

const Categories = () => {
  const Categories = [
    {
      icon: <FaFileAlt size={50} />,
      title: "Acounting & Finance",
    },
    {
      icon: <FaCaravan size={50} />,

      title: "Automotive Jobs",
    },
    {
      icon: <FaChalkboardTeacher size={50} />,
      title: "Business & Tech",
    },
    {
      icon: <FaUserGraduate size={50} />,
      title: "Education Training",
    },
    {
      icon: <BsBagPlusFill size={50} />,
      title: "Healthcare",
    },
    {
      icon: <PiBowlFoodDuotone size={50} />,
      title: "Reastaurant & Foods",
    },
    {
      icon: <FaPlane size={50} />,
      title: "Transportation",
    },
    {
      icon: <BsFillTelephoneFill size={50} />,
      title: "Telecomunications",
    },
  ];

  return (
    <div className="bg-slate-100 px-3 py-5">
      <Container>
        <h3 className="text-2xl md:text-5xl font-semibold md:font-bold text-center my-5 lg:my-20">
          Explore Our Best Categories
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-3">
          {Categories.map((category, i) => (
            <div
              key={i}
              className="flex justify-center items-center flex-col bg-white py-5 rounded-xl shadow-black/15">
              <span className="mb-3 text-green-700">{category.icon}</span>
              <h2 className=" text-xl text-green-700">{category.title}</h2>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
