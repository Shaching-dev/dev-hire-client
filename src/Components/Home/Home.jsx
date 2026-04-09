import React from "react";
import Banner from "./Banner/Banner";
import Working from "./Banner/Working";
import Categories from "./Banner/Categories";
import Videos from "./Banner/Videos";
import Hire from "./Banner/Hire";

const Home = () => {
  return (
    <div>
      <Banner />
      <Working />
      <Hire />
      <Categories />
      <Videos />
    </div>
  );
};

export default Home;
