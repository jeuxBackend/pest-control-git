import React, { useEffect, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import loginSideImage from "./assets/loginSideImage.png";
import Logo from "./assets/logo.png";
import Bg from "./assets/bg.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance/axioisInstance";
import { useMyContext } from "../Context/Context";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { adminID, setAdminID } = useMyContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const notifyError = (e) => toast.error(e);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("admin/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.token) {
        console.log(response.data);
        localStorage.setItem("PestToken", response.data.token);
        setAdminID(response.data.user.id);
        navigate("/Dashboard");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        notifyError(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("PestToken");

    if (token) {
      navigate("/Dashboard");
    }
  }, [navigate]);

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
            <p className="text-4xl text-[#003a5f] font-bold">Welcome back!</p>
            {/* <p className="text-[#003a5f] text-lg font-[500] mt-4">Access the admin portal to design and deliver certificates with ease.</p> */}
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
            <div className="relative mb-4 text-start">
              <label htmlFor="" className="text-[#003a5f] font-[600] text-lg">
                Password
              </label>
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type={isPasswordVisible ? "text" : "password"}
                className="w-full ps-4 py-3 mt-2 rounded-lg bg-[#ffff] text-[#003a5f] border border-[#003b5f57] placeholder-gray-500"
                aria-label="Password"
              />
              <div
                className="text-[#003a5f] absolute right-4 top-[51px] pt-1 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </div>
            </div>
            <p className="text-[#003a5f] text-lg w-100 text-end">
              <Link to={"/ForgetPassword"}>Forget password?</Link>
            </p>
            <div className="w-full text-center">
              {/* <Link to="/Dashboard"> */}
              <button
                type="submit"
                className="bg-[#c90000] w-[75%] py-3 text-lg text-white font-bold rounded-lg mt-3  text-center"
              >
                Login
              </button>
              {/* </Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
