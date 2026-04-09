import React from "react";
import { BounceLoader } from "react-spinners";

const FirebaseLoading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <BounceLoader size={80} color="green" loading="true" />
    </div>
  );
};

export default FirebaseLoading;
