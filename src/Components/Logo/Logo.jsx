import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link className="cursor-pointer inline-flex" to={"/"}>
      <h3 className="text-2xl font-bold text-white">Dev Hire</h3>
    </Link>
  );
};

export default Logo;
