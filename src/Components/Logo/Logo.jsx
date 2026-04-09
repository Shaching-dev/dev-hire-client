import React from "react";
import { Link } from "react-router";

import LogoImage from "../../assets/logo.png";

const Logo = () => {
  return (
    <Link className="cursor-pointer inline-flex" to={"/"}>
      <h3 className="text-green-600 text-2xl font-bold px-3">Dev Hire</h3>
    </Link>
  );
};

export default Logo;
