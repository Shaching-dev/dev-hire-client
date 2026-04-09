import React from "react";
import bannerImage from "../../../assets/banner1.jpg";
import SearchBar from "./SearchBar";

const Banner = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto h-[600px] md:h-[500px] ">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <h3 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-4">
          Find the great exciting <br /> remote-friendly jobs
        </h3>

        <p className="text-gray-200 mb-8 text-sm md:text-lg max-w-xl">
          Getting a new job is never easy. Check what new jobs we have in store
          for you on Job Stock.
        </p>

        {/* SearchBar inside content */}
        <div className="w-full">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Banner;
