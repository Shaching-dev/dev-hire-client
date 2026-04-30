import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "../useAuth/useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const reqInterceptors = axiosSecure.interceptors.request.use(
      async (config) => {
        if (!user) return config;

        try {
          const token = await user.getIdToken(false);
          config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          console.error("Token error:", error);
        }

        return config;
      },
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 401) {
            navigate("/auth/login");
          }

          if (statusCode === 403) {
            navigate("/forbidden");
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptors);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
