import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../../hooks/useAuth/useAuth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();

  const [signing, setSigning] = useState(false);

  const handleSignInWithGoogle = async () => {
    setSigning(true);
    try {
      const res = await signInWithGoogle();
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setSigning(false);
    }
  };

  return (
    <button onClick={handleSignInWithGoogle} className="btn w-full">
      {signing ? (
        <span className="animate-spin text-primary">
          <AiOutlineLoading3Quarters size={20} />
        </span>
      ) : (
        <>
          <FcGoogle size={25} />
          <span className="text-[16px]">Continue With Google</span>
        </>
      )}
    </button>
  );
};

export default SocialLogin;
