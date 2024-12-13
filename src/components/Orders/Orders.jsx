import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "./assets/search-icon.png";
import CardBg from "./assets/card-bg.png";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";
import { TailSpin } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

function Orders() {
  const {
    pageHeading,
    setPageHeading,
    setOpenOrderDetail,
    setOpenAssignInspector,
    orderId,
    setOrderId,
    inspectorIdForAssign,
    setInspectorIdForAssign,
    orderToast,
    setOrderToast,
  } = useMyContext();
  const [allPendingOrders, setAllPendingOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrder, setFilteredOrders] = useState([]);
  const notify = () => toast.success("Inspector Assigned Successfully");
  const notifyError = () => toast.error("Inspector Not Assigned");

  const getAllPendingOrders = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("admin/get-pending-order");
      if (response.data) {
        console.log(response.data.order);
        setAllPendingOrders(response.data.order);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllPendingOrders();
  }, []);

  useEffect(() => {
    if (orderToast === 1) {
      notify();
      setOrderToast(0);
    } else if (orderToast === 2) {
      notifyError();
      setOrderToast(0);
    } else {
    }
  }, [orderToast]);

  function convertMillisecondsToDate(milliseconds) {
    if (!milliseconds || isNaN(milliseconds)) {
      return "Invalid time";
    }

    const date = new Date(Number(milliseconds));

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} `;
  }

  useEffect(() => {
    let filteredOrders =
      searchQuery && searchQuery.trim() !== ""
        ? allPendingOrders.filter((order) =>
            order.user.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : allPendingOrders;

    setFilteredOrders(filteredOrders);
  }, [searchQuery, allPendingOrders]);

  return (
    <div className="w-full h-full min-h-screen bg-[#fafafa]">
      <Toaster />
      <div className="AllUsers-div relative  lg:ml-[260px] px-3 top-[20px]">
        <div className="users-nav w-full flex flex-wrap justify-between">
          <div className="active-block-brns xl:w-[40%] lg:w-[100%] mt-2">
            <ul className="flex flex-wrap gap-3">
              <div className="flex items-center gap-x-6 bg-white h-[50px] border shadow-sm rounded-lg px-2">
                <li>
                  <Link className="flex justify-center py-2 font-semibold rounded bg-[#c90000]  w-[100px] h-[40px] text-[#ffff] cursor-pointer">
                    <div className="flex gap-x-2 items-center">Pending</div>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/Active-Orders"}
                    onClick={() => setPageHeading("Active Orders")}
                    className="flex justify-center py-2 font-semibold rounded  w-[100px] h-[40px] text-[#00000] cursor-pointer"
                  >
                    <div className="flex gap-x-2 items-center">Active</div>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setPageHeading("Completed")}
                    to={"/Orders-History"}
                    className="flex justify-center py-2 font-semibold w-[100px] h-[40px] text-[#000000] cursor-pointer"
                  >
                    <div className="flex gap-x-2 items-center">Completed</div>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
            <TailSpin
              height={50}
              width={50}
              color="#0066a5"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <div className="orders-data mt-8">
            {/* order cards start */}
            <div className="flex flex-wrap">
              {Array.isArray(allPendingOrders) &&
              allPendingOrders.length > 0 ? (
                filteredOrder.map((data, index) => (
                  <div key={index} className="lg:w-1/3 md:w-1/2 w-full p-2">
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
                        <span className="font-semibold">
                          {convertMillisecondsToDate(data.starting_date)}
                        </span>
                      </div>
                      <div className="py-2 px-2">
                        <span className="text-[#bdbcc1]">End Date: </span>
                        <span className="font-semibold">
                          {convertMillisecondsToDate(data.ending_date)}
                        </span>
                      </div>
                      <div className="py-2 px-2">
                        <span className="text-[#bdbcc1]">Location: </span>
                        <span className="ms-1">
                          {/* {data.order_location.map((locationData, locIndex) => (
                            <span key={locIndex} className="font-semibold">
                              {locationData.location}
                              {locIndex < data.order_location.length - 1 &&
                                ", "}
                            </span>
                          ))} */}

                          {data.order_location.map((locationData, locIndex) => (
                            <div
                              key={locIndex}
                              className="font-semibold text-[#0000001e]"
                            >
                              {data.order_location.length > 1 && (
                                <span>{`Location ${locIndex + 1}: `}</span>
                              )}
                              <span className="text-[#000000] font-semibold">
                                {locationData.location}
                              </span>
                            </div>
                          ))}
                        </span>
                        {/* <div>
                        {data.order_location.map((locationData, locIndex) => (
                          <div
                            key={locIndex}
                            className="font-semibold text-[#0000001e]"
                          >
                            {data.order_location.length > 1 && (
                              <span>{`Location ${locIndex + 1}: `}</span>
                            )}
                            <span className="text-[#000000] font-semibold">
                              {locationData.location}
                            </span>
                          </div>
                        ))}
                      </div> */}
                      </div>
                      <div className="flex justify-center mt-2">
                        <button
                          onClick={function () {
                            setOpenAssignInspector(true), setOrderId(data.id);
                          }}
                          className="flex justify-center items-center py-2 font-semibold rounded w-[250px] h-[45px] bg-[#003a5f] text-[#ffff] cursor-pointer"
                        >
                          <span className="flex gap-x-2 items-center">
                            Assign Technician
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
