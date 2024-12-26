import React, { useEffect, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import loginSideImage from "./assets/loginSideImage.png";
import Logo from "./assets/logo.png";
import Bg from "./assets/bg.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance/axioisInstance";
import { useMyContext } from "../Context/Context";
import toast, { Toaster } from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const notifyError = (e) => toast.error(e);

  const navigate = useNavigate();


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("forgot", {
        email: email,
      });
  
      if (response.data && response.data.status === "success") {
        
        toast.success(response.data.message); 
        navigate("/"); 
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      
      if (error.response) {
        console.error(error.response);
        toast.error(error.response.data.message || "An error occurred.");
      } else {
        console.error(error);
        toast.error("Network error. Please try again.");
      }
    }
  };
  

  return (
    <div
      className="min-h-screen flex lg:flex-row-reverse md:flex-col flex-col items-center h-screen w-full min-w-screen bg-cover"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <Toaster />
      <div className="lg:w-[60%] lg:block md:hidden hidden">
        <img
          src={loginSideImage}
          alt="login-sidebar"
          className="h-screen p-4 w-screen"
        />
      </div>
      <div className="lg:w-1/2 md:w-1/1 w-1/1 w-full  opacity-75">
        <div className="login-box rounded-lg lg:px-24 md:px-2 px-2 py-6">
          <div className="flex justify-start mb-24 lg:mt-0 mt-32">
            <img src={Logo} alt="logo" className="h-[80px] mt-2" />
          </div>
          <div className="text-start mt-2">
            <p className="text-4xl text-[#003a5f] font-bold">Forget Password</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4 mt-3 text-start">
              <label htmlFor="" className="text-[#003a5f] font-[600] text-lg">
                Email
              </label>
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                type="email"
                className="w-full ps-4 py-3 mt-2 bg-[#ffff] rounded-lg border border-[#003b5f57] text-[#003a5f] placeholder-gray-500"
                aria-label="Email Address"
              />
            </div>

            <div className="w-full text-center">
              <button
                type="submit"
                className="bg-[#c90000] w-[75%] py-3 text-lg text-white font-bold rounded-lg mt-3  text-center"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
