import React from "react";
import Banner from "./Banner/Banner";
import Working from "./Banner/Working";
import Categories from "./Banner/Categories";
import Videos from "./Banner/Videos";

const Home = () => {
  return (
    <div>
      <Banner />
      <Working />
      <Categories />
      <Videos />
    </div>
  );
};

export default Home;
