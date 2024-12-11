import React, { useEffect, useState } from "react";
import { useMyContext } from "../../Context/Context";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance/axioisInstance";
import { IoIosCloseCircleOutline } from "react-icons/io";

function PestDetail() {
    const {
        pageHeading,
        setPageHeading,
        setOpenOrderDetail,
        activeOrderId,
        setActiveOrderId, pestDetails, setPestDetails,pestDescription, pestName
      } = useMyContext();
      const [order, setOrder] = useState({});
      const [orderUserName, setOrderUserName] = useState({});
      const [orderLocation, setOrderLocation] = useState([]);
      const [pest, setPest] = useState([]);
    
      
    
      return (
        <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
          <div className="flex items-center justify-center py-10 w-full min-h-screen ">
            <div className="bg-[#ffff] rounded-lg w-[0%]\ sm:w-[40rem] p-3 flex flex-col items-center justify-center gap-2 relative">
            <IoIosCloseCircleOutline onClick={()=>setPestDetails(false)} className="text-[1.5rem] absolute right-2 top-2 cursor-pointer"/>
              <h1 className="xs:text-[1.5rem] text-[1.2rem] sm:text-[2rem] font-medium text-[#08395f]">
                Pest Detail
              </h1>
              <div className="w-full p-6 flex flex-col gap-3">
                <div className="">
                  <p className="text-lg opacity-50">
                    Pest Name:
                  </p>
                  <p className="text-lg font-semibold">
                  {pestName?pestName:""}
                  </p>
                  
                </div>
                <div className="">
                  <p className="text-lg opacity-50">
                    Description:
                  </p>
                  <p className="text-lg font-semibold">
                  {pestDescription?pestDescription:""}

                  </p>
                  
                </div>
                
    
                
              </div>
            </div>
          </div>
        </div>
      );
}

export default PestDetail