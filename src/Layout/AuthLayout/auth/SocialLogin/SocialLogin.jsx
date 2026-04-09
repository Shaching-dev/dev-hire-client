import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../../hooks/useAuth/useAuth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const [signing, setSigning] = useState(false);

  const location = useLocation();
  const naviagate = useNavigate();
  const from = location?.state?.from || "/";

  const handleSignInWithGoogle = async () => {
    setSigning(true);
    try {
      const res = await signInWithGoogle();
      // console.log(res);
      naviagate(from, { replace: true });
      toast.success(`Welcome ${res.user.displayName}`);
    } catch (error) {
      // console.log(error);
      toast.error(`${error}`);
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
