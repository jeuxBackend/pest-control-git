import React, { useState } from "react";
import Add from "./assets/add-icon.png";
import { useMyContext } from "../../Context/Context";

function CreateOrederModal() {
  const { openCreateOrder, setOpenCreateOrder } = useMyContext();

  return (
    <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
      <div className="flex items-center justify-center py-10 w-full min-h-screen ">
        <div className="bg-[#ffff] rounded-lg w-[0%]\ sm:w-[40rem] pt-3 px-3 flex flex-col items-center justify-center gap-2">
          <h1 className="xs:text-[1.5rem] text-[1.2rem] sm:text-[2rem] mb-[-22px] font-medium">
            Create Order
          </h1>
          <form className="w-full p-6 flex flex-col gap-3">
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="lg:w-[50%] w-[100%]">
                <p className="mb-1 font-medium">Pest Type</p>
                <div className="border rounded-lg px-2 py-3">
                  <select name="" id="" className="w-full border-0">
                    <option value="">Ants</option>
                  </select>
                </div>
              </div>
              <div className="lg:w-[50%] w-[100%]">
                <p className="mb-1 font-medium">Treatment Type</p>
                <div className="border rounded-lg px-2 py-3">
                  <select name="" id="" className="w-full rounded-lg border-0">
                    <option value="">Pest Prevention</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="lg:w-[50%] w-[100%]">
                <p className="mb-1 font-medium">Required Session</p>
                <div className="border rounded-lg px-2 py-3">
                  <select name="" id="" className="w-full border-0">
                    <option value="">4</option>
                  </select>
                </div>
              </div>
              <div className="lg:w-[50%] w-[100%]">
                <p className="mb-1 font-medium">Time</p>
                <input
                  type="time"
                  placeholder="Enter Time"
                  className="w-full py-3 px-2 rounded-lg border shadow-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="lg:w-[100%] w-[100%]">
                <p className="mb-1 font-medium">Inspector</p>
                <div className="border rounded-lg px-2 py-3">
                  <select name="" id="" className="w-full rounded-lg border-0">
                    <option value="">Esther Howard</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="lg:w-[100%] w-[100%]">
                <div className="flex justify-between">
                  <p className="mb-1 font-medium">Location</p>
                  <button className="h-[20px] w-[20px] bg-[#003a5f] rounded flex justify-center items-center me-1">
                    <img src={Add} className="w-[12px]" alt="" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Enter Location"
                  className="w-full py-3 px-2 rounded-lg border shadow-sm"
                />
              </div>
            </div>
            <div className="font-medium flex items-center justify-center gap-3 mt-3">
              <button
                type="reset"
                onClick={() => setOpenCreateOrder(false)}
                className="w-[60%] sm:w-[35%] md:w-[40%] border shadow-sm py-3 rounded bg-white font-semibold text-black"
              >
                Cancel
              </button>
              <button className="w-[60%] sm:w-[35%] md:w-[40%] py-3 rounded shadow-sm font-semibold bg-[#c90000] text-white">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateOrederModal;
