import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "./assets/search-icon.png";
import CardBg from "./assets/card-bg.png";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";
import { TailSpin } from 'react-loader-spinner';


function Orders() {
  const { pageHeading, setPageHeading, setOpenOrderDetail, openConfirmModal, setOpenConfirmModal, activeOrderId, setActiveOrderId, activeOrderToast, setActiveOrderToast } = useMyContext();
  const [allActiveOrders, setAllActiveOrders] = useState([]);
  const [loading, setLoading] = useState(false);  


  const notify = () => toast.success("Order Confirmed Successfully");
  const notifyError = () => toast.error("Order Not Confirmed");


  const getAllActiveOrders = async () => {
    try {
      setLoading(true); 
      const response = await axiosInstance.get("admin/get-active-order");
      if (response.data) {
        console.log(response.data.order);
        setAllActiveOrders(response.data.order);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
    finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    getAllActiveOrders();
  }, []);
  useEffect(() => {
    getAllActiveOrders();
  }, [openConfirmModal]);



  useEffect(() => {
    if (activeOrderToast === 1) {
      notify();
      setActiveOrderToast(0);
    } else if (activeOrderToast === 2) {
      notifyError();
      setActiveOrderToast(0);
    } else {
    }
  }, [activeOrderToast]);


  return (
    <div className="w-full h-full min-h-screen bg-[#fafafa]">
      <Toaster />
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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <TailSpin height={50} width={50} color="#0066a5" ariaLabel="loading" />
          </div>
        ) : (
        <div className="orders-data mt-8">
          {/* order cards start */}
          <div className="flex flex-wrap">
          {Array.isArray(allActiveOrders) && allActiveOrders.length > 0 ? (
              allActiveOrders.map((data, index) => (
            <div className="lg:w-1/3 md:w-1/2 w-full p-2">
              <div
                className="border shadow-sm rounded-lg p-2 bg-cover"
                style={{ backgroundImage: `url(${CardBg})` }}
              >
                <div className="py-2 px-2">
                  <span className="text-[#bdbcc1]">Client Name: </span>
                  <span className="font-semibold">{data.user.name}</span>
                </div>
                <div className="py-2 px-2">
                  <span className="text-[#bdbcc1]">Start Date: </span>
                  <span className="font-semibold">{data.starting_date}</span>
                </div>
                <div className="py-2 px-2">
                  <span className="text-[#bdbcc1]">End Date: </span>
                  <span className="font-semibold">{data.ending_date}</span>
                </div>
                <div className="py-2 px-2">
                  <span className="text-[#bdbcc1]">Location: </span>
                  <span className="ms-1">
                        {data.order_location.map((locationData, locIndex) => (
                          <span key={locIndex} className="font-semibold">
                            {locationData.location}
                            {locIndex < data.order_location.length - 1 && ", "}
                          </span>
                        ))}
                      </span>
                </div>
                <div className="flex flex-wrap gap-x-2 justify-center mt-2">
                  <button
                    onClick={function () {
                      setOpenOrderDetail(true),
                      setActiveOrderId(data.id);
                    }}
                    className="flex justify-center py-2 font-semibold rounded w-[130px] h-[45px] bg-[#003a5f] text-[#ffff] cursor-pointer"
                  >
                    <span className="flex gap-x-2 items-center">
                      View Detail
                    </span>
                  </button>
                  <button
                    onClick={function () {
                      setOpenConfirmModal(true),
                      setActiveOrderId(data.id);
                    }}
                    className="flex justify-center py-2 font-semibold rounded w-[130px] h-[45px] bg-[#e00000] text-[#ffff] cursor-pointer"
                  >
                    <span className="flex gap-x-2 items-center">
                      Complete Order
                    </span>
                  </button>
                </div>
              </div>
            </div>
                ))
              ) : (
                <p>No Order found.</p>
              )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
