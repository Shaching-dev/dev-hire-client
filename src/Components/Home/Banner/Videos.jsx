import React from "react";

import bannerVideo from "../../../assets/6804706-uhd_4096_2160_25fps.mp4";

const Videos = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto h-[500px] md:h-[550px]  overflow-hidden">
      {/* 🎥 Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover">
        <source src={bannerVideo} type="video/mp4" />
      </video>

      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* 🔥 Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <h3 className="text-white text-3xl md:text-5xl font-bold mb-4">
          Find the great exciting <br /> remote-friendly jobs
        </h3>

        <p className="text-gray-200 mb-8 max-w-xl">
          Getting a new job is never easy. Check what new jobs we have in store
          for you.
        </p>
      </div>
    </div>
  );
};

export default Videos;
