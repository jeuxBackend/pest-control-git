import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../../Context/Context";
import bg from "/modalBG.png"
import axiosInstance from "../../axiosInstance/axioisInstance";


function ActiveClient() {
  const { pageHeading, setPageHeading,userId, setUserId } = useMyContext();
  const { openLogout, setOpenLogout,setOpenActiveUser } = useMyContext();
  const navigate = useNavigate()
  const changeUserStatus = async (changeStatus) => {
    try {
      const response = await axiosInstance.post(`admin/user-toggle`, {
        id: userId?.id,
      });
      if (response.data) {
        

        console.log(response.data);

        setOpenActiveUser(false)
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
    <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
      <div className="flex items-center justify-center py-10 w-full min-h-screen ">
        <div className="bg-[#ffff] rounded-xl w-[0%]\ sm:w-[40rem] p-3 flex flex-col items-center justify-center gap-2 relative pt-10">
          {/* <form className="w-full p-6 flex flex-col gap-3"> */}
          
              <img src={bg} className="w-[90px] absolute top-2 left-2" alt="" />
           
            <div className="text-center w-full">
              <p className="text-3xl text-[#003a5f] font-bold"> {
                  userId?.type === 'block'
                   ? "Active Client"
                    : "Inactive Client"
                } </p>
            </div>
            <div className="flex justify-center px-10 border-b-2 w-full pb-4 border-dashed">
              <p className="text-[#89959a] w-full text-center text-lg font-[500]">
               
                Are you sure you want to <br />  {
                  userId?.type === 'block'
                   ? "Active Client"
                    : "Inactive Client"
                }
              </p>
            </div>
            <div className="font-medium flex items-center justify-center gap-3 mt-3 w-full">
              <button
                onClick={() => setOpenActiveUser(false)}
                className="w-[60%]  border shadow-sm py-3 rounded bg-white font-semibold text-black"
              >
                Cancel
              </button>
              <button
               onClick={changeUserStatus}
                
                className={`w-[60%]  py-3 rounded shadow-sm font-semibold bg-[#0062a5] text-white ${userId?.type==='block'?"bg-[#0062a5]":"bg-[#c53d3d]"}`}
              >
                <div
               
                
                to={"/"}> {
                  userId?.type === 'block'
                   ? "Active Client"
                    : "Inactive Client"
                } </div>
              </button>
            </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default ActiveClient;
