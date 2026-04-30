import React from "react";
import useAuth from "../../hooks/useAuth/useAuth";

export default function Developers() {
  const { user } = useAuth();

  console.log(user);
  return (
    <div>
      <h3>Hello developers</h3>
    </div>
  );
}
