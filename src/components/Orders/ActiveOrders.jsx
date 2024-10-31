import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "./assets/search-icon.png";
import CardBg from "./assets/card-bg.png";
import { useMyContext } from "../../Context/Context";

function Orders() {
  const { pageHeading, setPageHeading, setOpenOrderDetail } = useMyContext();

  return (
    <div className="w-full h-full min-h-screen bg-[#fafafa]">
      <div className="AllUsers-div relative  lg:ml-[260px] px-3 top-[20px]">
        <div className="users-nav w-full flex flex-wrap justify-between">
          <div className="active-block-brns xl:w-[40%] lg:w-[100%] mt-2">
            <ul className="flex flex-wrap gap-3">
              <div className="flex items-center gap-x-6 bg-white h-[50px] border shadow-sm rounded-lg px-2">
                <li>
                  <Link
                  to={"/Orders"}
                  onClick={() => setPageHeading("Pending Orders")}
                  className="flex justify-center py-2 font-semibold rounded w-[100px] h-[40px] text-[#000000] cursor-pointer">
                    <div className="flex gap-x-2 items-center">Pendings</div>
                  </Link>
                </li>
                <li>
                  <Link
                  to={"/Active-Orders"}
                  className="flex justify-center py-2 font-semibold rounded bg-[#c90000]  w-[100px] h-[40px] text-[#ffff] cursor-pointer">
                    <div className="flex gap-x-2 items-center">Active</div>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setPageHeading("Orders History")}
                    to={"/Orders-History"}
                    className="flex justify-center py-2 font-semibold w-[100px] h-[40px] text-[#000000] cursor-pointer"
                  >
                    <div className="flex gap-x-2 items-center">History</div>
                  </Link>
                </li>
              </div>
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
        <div className="orders-data mt-8">
          {/* order cards start */}
          <div className="flex flex-wrap">
            <div className="lg:w-1/3 md:w-1/2 w-full p-2">
              <div
                className="border shadow-sm rounded-lg p-2 bg-cover"
                style={{ backgroundImage: `url(${CardBg})` }}
              >
                <div className="py-2 px-2">
                  <span className="text-[#bdbcc1]">Client Name: </span>
                  <span className="font-semibold">Savannah Nguyen</span>
                </div>
                <div className="py-2 px-2">
                  <span className="text-[#bdbcc1]">Date: </span>
                  <span className="font-semibold">October 25, 2019</span>
                </div>
                <div className="py-2 px-2">
                  <span className="text-[#bdbcc1]">Location: </span>
                  <span className="font-semibold">
                    4517 Washington Ave. Manchester, Kentucky 39495
                  </span>
                </div>
                <div className="flex justify-center mt-2">
                  <button
                    onClick={function () {
                      setOpenOrderDetail(true);
                    }}
                    className="flex justify-center py-2 font-semibold rounded w-[250px] h-[45px] bg-[#003a5f] text-[#ffff] cursor-pointer"
                  >
                    <span className="flex gap-x-2 items-center">
                      View Detail
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full p-2">
              <div
                className="border shadow-sm rounded-lg p-2 bg-cover"
                style={{ backgroundImage: `url(${CardBg})` }}
              >
                <div className="py-2 px-2">
                  <span className="text-[#bdbcc1]">Client Name: </span>
                  <span className="font-semibold">Savannah Nguyen</span>
                </div>
                <div className="py-2 px-2">
                  <span className="text-[#bdbcc1]">Date: </span>
                  <span className="font-semibold">October 25, 2019</span>
                </div>
                <div className="py-2 px-2">
                  <span className="text-[#bdbcc1]">Location: </span>
                  <span className="font-semibold">
                    4517 Washington Ave. Manchester, Kentucky 39495
                  </span>
                </div>
                <div className="flex justify-center mt-2">
                  <button
                    onClick={function () {
                      setOpenOrderDetail(true);
                    }}
                    className="flex justify-center py-2 font-semibold rounded w-[250px] h-[45px] bg-[#003a5f] text-[#ffff] cursor-pointer"
                  >
                    <span className="flex gap-x-2 items-center">
                      View Detail
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full p-2">
              <div
                className="border shadow-sm rounded-lg p-2 bg-cover"
                style={{ backgroundImage: `url(${CardBg})` }}
              >
                <div className="py-2 px-2">
                  <span className="text-[#bdbcc1]">Client Name: </span>
                  <span className="font-semibold">Savannah Nguyen</span>
                </div>
                <div className="py-2 px-2">
                  <span className="text-[#bdbcc1]">Date: </span>
                  <span className="font-semibold">October 25, 2019</span>
                </div>
                <div className="py-2 px-2">
                  <span className="text-[#bdbcc1]">Location: </span>
                  <span className="font-semibold">
                    4517 Washington Ave. Manchester, Kentucky 39495
                  </span>
                </div>
                <div className="flex justify-center mt-2">
                  <button
                    onClick={function () {
                      setOpenOrderDetail(true);
                    }}
                    className="flex justify-center py-2 font-semibold rounded w-[250px] h-[45px] bg-[#003a5f] text-[#ffff] cursor-pointer"
                  >
                    <span className="flex gap-x-2 items-center">
                      View Detail
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
