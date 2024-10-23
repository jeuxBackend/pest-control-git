import React, { useEffect, useState } from "react";
import Bg from "./assets/bg.png";

function Dashboard() {
  const [currentDate, setCurrentDate] = useState("");
 
  useEffect(() => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(date.toLocaleDateString(undefined, options));
  }, []);

  return (
    <div className="w-full max-h-full min-h-screen bg-[#fafafa]">
      <div className="dashboard-div  relative lg:ml-[260px] px-3 top-[20px] h-full">
        <p className="text-3xl text-black font-bold">
          Welcome, Cameron W.                   
        </p>
        <div className="date_description flex flex-wrap gap-2 items-center mt-2">
        <p className="mb-0 font-semibold text-black text-lg">{currentDate}.</p>

          <p className="mb-0 text-[#535355]">
            Here is a quick snnapshot of the overall business
          </p>
        </div>
        <div className="overViews flex flex-wrap w-full mt-4">
          <div className="p-2 lg:w-1/3 md:w-1/3 w-full">
            <div className="rounded-xl bg-white border shadow-md px-5 py-10">
              <p className="text-3xl text-[#c90000] font-semibold">All Users</p>
              <p className="text-4xl mt-3 font-semibold text-[#003a5f]">
                5,500
              </p>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/3 w-full">
            <div className="rounded-xl bg-white shadow-md border px-5 py-10">
              <p className="text-3xl text-[#c90000] font-semibold">
                Inspector
              </p>
              <p className="text-4xl mt-3 font-semibold text-[#003a5f]">
               5,000
              </p>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/3 w-full">
            <div className="rounded-xl bg-white shadow-md border px-5 py-10">
              <p className="text-3xl text-[#c90000] font-semibold">
                Total Order
              </p>
              <p className="text-4xl mt-3 font-semibold text-[#003a5f]">
                500
              </p>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/3 w-full">
            <div className="rounded-xl bg-white shadow-md border px-5 py-10">
              <p className="text-3xl text-[#c90000] font-semibold">
                Total Active Order
              </p>       
              <p className="text-4xl mt-3 font-semibold text-[#003a5f]">
                250
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
