import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ActiveColor from "./assets/active-color.png";
import Active from "./assets/active.png";
import BlockColorWhite from "./assets/block-color-white.png";
import SearchIcon from "./assets/search-icon.png";
import UserPic from "./assets/user-pic.png";
import { useMyContext } from "../../Context/Context";

const BlockUsers = () => {
  const { pageHeading, setPageHeading } = useMyContext();

  return (
    <div className="w-full h-full min-h-screen bg-[#fafafa]">
      <div className="AllUsers-div relative  lg:ml-[260px] px-3 top-[20px]">
        <div className="users-nav w-full flex flex-wrap justify-between">
          <div className="active-block-brns xl:w-[40%] lg:w-[100%] mt-2">
            <ul className="flex flex-wrap gap-3">
              <li>
                <Link
                  to={"/Active-Users"}
                  onClick={() => setPageHeading("Active Users")}
                  className="flex justify-center py-2 border shadow-sm font-semibold w-[180px] h-[50px] text-lg rounded text-[#828282] bg-transparent cursor-pointer"
                >
                  <div className="flex gap-x-2 items-center">
                    <img className="w-[20px]" src={Active} alt="active Icon" />
                    Active Users
                  </div>
                </Link>
              </li>
              <li>
                <a className="flex justify-center py-2 border border-[#c90000] bg-[#c90000] shadow-sm font-semibold w-[180px] h-[50px] text-lg rounded text-[#ffff] cursor-pointer">
                  <div className="flex gap-x-2 items-center">
                    <img
                      className="w-[20px]"
                      src={BlockColorWhite}
                      alt="active Icon"
                    />
                    Block Users
                  </div>
                </a>
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
                <tr className="">
                  <td className="py-3 border-b border-r">
                    <div className="flex items-center justify-start ps-6 gap-x-3">
                      <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                        <img
                          src={UserPic}
                          alt="Admin"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-lg text-black font-semibold">
                          Brooklyn Sim
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 border-b border-r">
                    <p className="text-black px-8">brooklyn@mail.com</p>
                  </td>
                  <td className="py-3 border-b border-r">
                    <p className="text-black px-2">3517 W. Gray St. Utica, 
                    Pennsylvania 57867</p>
                  </td>
                  <td className="py-3 px-5 border-b border-r">
                    <div className="flex justify-center">
                      <button className="px-8 py-2 text-[#003a5f] text-lg font-semibold rounded-full bg-[#d4dee3] flex justify-center items-center gap-3">
                        <img src={ActiveColor} className="w-[20px]" alt="" />
                        Active
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockUsers;
