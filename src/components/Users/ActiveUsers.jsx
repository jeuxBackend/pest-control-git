import React, { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ActiveColorWhite from "./assets/active-color-white.png";
import BlockColor from "./assets/block-color.png";
import Block from "./assets/block.png";
import SearchIcon from "./assets/search-icon.png";
import UserPic from "./assets/user-pic.png";
import UserPic2 from "./assets/user-pic2.png";
import UserPic3 from "./assets/user-pic3.png";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";

const ActiveUsers = () => {
  const { pageHeading, setPageHeading } = useMyContext();
  const [activeUser, setActiveUser] = useState([]);



  const getActiveUsers = async () => {
    try {
      const response = await axiosInstance.get("admin/get-active-user");
      if (response.data) {
        console.log(response.data);
        setActiveUser(response.data.users);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getActiveUsers();
  }, []);

  const changeUserStatus = async (changeStatus) => {
    try {
      const response = await axiosInstance.post(`admin/user-toggle`, {
        id: changeStatus,
      });
      if (response.data) {
        console.log(response.data);
        getActiveUsers();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };



  return (
    <div
      className="w-full h-full min-h-screen poppins bg-[#fafafa]">
      <div className="AllUsers-div relative  lg:ml-[260px] px-3 top-[20px]">
        <div className="users-nav w-full flex flex-wrap justify-between">
          <div className="active-block-brns xl:w-[40%] lg:w-[100%] mt-2">
            <ul className="flex flex-wrap gap-3">
              <li>
                <a className="flex justify-center py-2 border border-[#003a5f] bg-[#003a5f] shadow-sm font-semibold w-[180px] h-[50px] text-lg rounded text-[#ffff] cursor-pointer">
                  <div className="flex gap-x-2 items-center">
                    <img
                      className="w-[20px]"
                      src={ActiveColorWhite}
                      alt="active Icon"
                    />
                    Active Users
                  </div>
                </a>
              </li>
              <li>
                <Link
                  to={"/Block-Users"}
                  onClick={() => setPageHeading("Block Users")}
                  className="flex justify-center py-2 border shadow-sm font-semibold w-[180px] h-[50px] text-lg rounded text-[#828282] bg-transparent cursor-pointer"
                >
                  <div className="flex gap-x-2 items-center">
                    <img className="w-[20px]" src={Block} alt="active Icon" />
                    Block Users
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="user-add-search-div xl:w-[60%] lg:w-[100%] mt-2 flex justify-end">
            <div className="flex flex-wrap gap-3">
              <div className="search-box flex gap-3">
                <input
                  type="text"
                  className="bg-transparent text-black border h-[50px] lg:w-[300px] md:w-[300px] w-[230px] rounded ps-3"
                  placeholder="Search"
                />
                <button className="h-[50px] w-[50px] bg-[#c90000] rounded flex justify-center items-center">
                  <img src={SearchIcon} className="w-[22px]" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="All-users-data mt-8">
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[800px] bg-transparent text-center shadow-sm overflow-hidden">
              <thead className="text-sm">
                <tr>
                  <th className="px-0">
                    <p className="py-3 text-start ps-8 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 me-12 shadow-md">
                      <span className="">User Details</span>
                    </p>
                  </th>
                  <th className="px-0">
                    <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 shadow-md mx-6">
                      Email
                    </p>
                  </th>
                  <th className="px-0">
                    <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 mx-6 shadow-md">
                      Location
                    </p>
                  </th>
                  <th className="px-0">
                    <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 mx-6 shadow-md">
                      Status
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {activeUser.map((data, index)=>{
                return(
                <tr key={index} className="">
                  <td className="py-3 border-b border-r">
                    <div className="flex items-center justify-start ps-6 gap-x-3">
                      <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                        <img
                          src={data.profile_pic}
                          alt="user"
                          className="w-full border bg-white h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-lg text-black font-semibold">
                          {data.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 border-b border-r">
                    <p className="text-black px-8">{data.email}</p>
                  </td>
                  <td className="py-3 border-b border-r">
                    <p className="text-black px-2">{data.address}</p>
                  </td>
                  <td className="py-3 px-5 border-b border-r">
                    <div className="flex justify-center">
                    <button onClick={()=>changeUserStatus(data.id)} className="px-5 py-2 text-[#ff2f16] text-lg font-semibold rounded-full bg-[#fededc] flex justify-center items-center gap-3">
                        <img src={BlockColor} className="w-[18px]" alt="" />{" "}
                        Block
                      </button>
                    </div>
                  </td>
                </tr>
                  )  
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
