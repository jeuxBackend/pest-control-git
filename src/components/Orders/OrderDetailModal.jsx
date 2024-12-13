import React, { useEffect, useState } from "react";
import { useMyContext } from "../../Context/Context";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance/axioisInstance";

function OrederDetailModal() {
  const {
    pageHeading,
    setPageHeading,
    setOpenOrderDetail,
    activeOrderId,
    setActiveOrderId,
  } = useMyContext();
  const [order, setOrder] = useState({});
  const [orderUserName, setOrderUserName] = useState({});
  const [orderLocation, setOrderLocation] = useState([]);
  const [pest, setPest] = useState([]);

  const getOrder = async (id) => {
    try {
      const response = await axiosInstance.get(`admin/get-order-by-id/${id}`);
      if (response.data) {
        console.log(response?.data);
        setOrder(response?.data?.order);
        setOrderUserName(response?.data?.order?.user);
        setOrderLocation(response?.data?.order?.order_location);
        setPest(response?.data?.order?.pest_type?.title);
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
    getOrder(activeOrderId);
  }, [activeOrderId]);

  return (
    <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
      <div className="flex items-center justify-center py-10 w-full min-h-screen ">
        <div className="bg-[#ffff] rounded-lg w-[0%]\ sm:w-[40rem] p-3 flex flex-col items-center justify-center gap-2">
          <h1 className="xs:text-[1.5rem] text-[1.2rem] sm:text-[2rem] font-medium">
            Order Detail
          </h1>
          <div className="w-full p-6 flex flex-col gap-3">
            <div className="flex justify-between pb-3 border-b-2 border-dashed">
              <p className="text-lg font-semibold">
                {orderUserName?.name ? orderUserName?.name : ""}
              </p>
              <span className="leading-none text-end">
                <p className="text-sm">{order ? order?.starting_date : ""}</p>
                <p className="text-sm">{order ? order?.time : ""}</p>
              </span>
            </div>
            <div className="flex justify-between pb-3 border-b-2 border-dashed">
              <div className="">
                <span className="text-[#00000067] font-semibold">
                  Phone no:{" "}
                </span>
                <span className="text-black">{order ? order?.number : ""}</span>
              </div>
              <div className="">
                <span className="text-[#00000067] font-semibold">
                  Pest Type:{" "}
                </span>
                <span className="text-black capitalize">
                  {pest ? pest : ""}
                </span>
              </div>
            </div>

            <div className="flex justify-between pb-3 border-b-2 border-dashed">
              <div className="">
                <span className="text-[#00000067] font-semibold">
                  Location:{" "}
                </span>
                <span className="ms-1">
                  {orderLocation && orderLocation.length > 0 ? (
                    orderLocation.map((locationData, locIndex) => (
                      <div
                      key={locIndex}
                      className="font-semibold text-[#0000001e]"
                    >
                      {order.order_location.length > 1 && (
                        <span>{`Location ${locIndex + 1}: `}</span>
                      )}
                      <span className="text-[#000000] font-semibold">
                        {locationData.location}
                      </span>
                    </div>
                    ))
                  ) : (
                    <span>No locations available</span>
                  )}

                  {/* {order.order_location.map((locationData, locIndex) => (
                    <div
                      key={locIndex}
                      className="font-semibold text-[#0000001e]"
                    >
                      {order.order_location.length > 1 && (
                        <span>{`Location ${locIndex + 1}: `}</span>
                      )}
                      <span className="text-[#000000] font-semibold">
                        {locationData.location}
                      </span>
                    </div>
                  ))} */}
                </span>
              </div>
            </div>
            <div className="  pb-3 border-b-2 border-dashed">
              <span className="text-[#00000067] font-semibold">
                Technician Name:{" "}
              </span>
              <span className="font-semibold">
                {order?.inspector?.user?.name}
              </span>
            </div>

            <div className="flex justify-between pb-3">
              <div className="">
                <span className="text-black font-semibold">Description: </span>
                <span className="text-[#00000067]">
                  {order ? order.description : ""}
                </span>
              </div>
            </div>
            <div className="font-medium flex items-center justify-center gap-3 mt-3">
              <button
                type="reset"
                onClick={() => setOpenOrderDetail(false)}
                className="w-[60%] sm:w-[35%] md:w-[40%] border shadow-sm py-3 rounded bg-white font-semibold text-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrederDetailModal;
