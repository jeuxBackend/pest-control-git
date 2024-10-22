import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../../Context/Context";
import DeleteImage from "./assets/logout-image.png";

function AddUser() {
  const { pageHeading, setPageHeading } = useMyContext();
  const { openLogout, setOpenLogout } = useMyContext();

  return (
    <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
      <div className="flex items-center justify-center py-10 w-full min-h-screen ">
        <div className="bg-[#ffff] rounded-xl w-[0%]\ sm:w-[40rem] p-3 flex flex-col items-center justify-center gap-2">
          {/* <form className="w-full p-6 flex flex-col gap-3"> */}
            <div className="flex items-center justify-center">
              <img src={DeleteImage} className="w-[130px] " alt="" />
            </div>
            <div className="text-center w-full">
              <p className="text-2xl text-[#003a5f] font-bold">Logout</p>
            </div>
            <div className="flex justify-center px-10">
              <p className="text-[#89959a] w-full text-center text-lg font-[500]">
                Are you sure you want to Logout
              </p>
            </div>
            <div className="font-medium flex items-center justify-center gap-3 mt-3 w-full">
              <button
                onClick={() => setOpenLogout(false)}
                className="w-[60%] sm:w-[35%] md:w-[40%] border shadow-sm py-3 rounded bg-white font-semibold text-black"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpenLogout(false)}
                className="w-[60%] sm:w-[35%] md:w-[40%] py-3 rounded shadow-sm font-semibold bg-[#c90000] text-white"
              >
                <Link
                onClick={() => setPageHeading("Dashboard")}
                
                to={"/"}>Logout</Link>
              </button>
            </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default AddUser;
