import React, { useEffect } from "react";
import { useState } from "react";
import SearchIcon from "./assets/search-icon.png";
import Edit from "./assets/edit-btn.png";
import Delete from "./assets/delete-btn.png";
import Add from "./assets/add-icon.png";
import UserPic from "./assets/user-pic.png";
import UserPic2 from "./assets/user-pic2.png";
import UserPic3 from "./assets/user-pic3.png";
import { useMyContext } from "../../Context/Context";

function Inspector() {
    const {setOpenAddInspector, setOpenEditInspector, setOpenDeleteInspector} = useMyContext();
  return (
    <div className="w-full h-full min-h-screen bg-[#fafafa]">
      <div className="AllUsers-div relative  lg:ml-[260px] px-3 top-[20px]">
        <div className="users-nav w-full flex flex-wrap justify-between">
          <div className="active-block-brns xl:w-[40%] lg:w-[100%] mt-2"></div>
          <div className="user-add-search-div xl:w-[60%] lg:w-[100%] mt-2 flex justify-end">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setOpenAddInspector(true)}
                className="w-[180px] h-[50px] flex justify-center gap-2 items-center bg-[#003a5f] text-white text-lg font-semibold shadow-sm rounded"
              >
                <img src={Add} className="w-[15px]" alt="" />
                Tax Inspector
              </button>
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
              <thead className="uppercase text-sm">
                <tr>
                  <th className="px-0">
                    <p className="py-3 text-start ps-8 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 me-12 shadow-md">
                      <span className="">Inspector Details</span>
                    </p>
                  </th>
                  <th className="px-0">
                    <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 shadow-md mx-6">
                      Email
                    </p>
                  </th>
                  <th className="px-0">
                    <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 mx-6 shadow-md">
                      Password
                    </p>
                  </th>
                  <th className="px-0">
                    <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 mx-6 shadow-md">
                      Action
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
                          src={UserPic3}
                          alt="Admin"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-lg text-black font-semibold">
                          Courtney Henry
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 border-b border-r">
                    <p className="text-black ">courtney@mail.com</p>
                  </td>
                  <td className="py-3 border-b border-r">
                    <p className="text-black px-8">2464#</p>
                  </td>
                  <td className="py-3 border-b border-r">
                    <div className="flex gap-x-3 justify-center">
                      <button
                       onClick={() => setOpenEditInspector(true)}
                       >
                        <img src={Edit} className="w-[30px]" alt="" />
                      </button>
                      <button
                       onClick={() => setOpenDeleteInspector(true)}
                       >
                        <img src={Delete} className="w-[30px]" alt="" />
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
}

export default Inspector;
