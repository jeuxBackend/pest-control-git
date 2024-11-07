import React, { useEffect, useState } from "react";
import Bg from "./assets/bg.png";
import axiosInstance from "../../axiosInstance/axioisInstance";
import { TailSpin } from 'react-loader-spinner';


function Dashboard() {
  const [currentDate, setCurrentDate] = useState("");
  const [dataDashboard, setDataDashboard] = useState({});
  const [loading, setLoading] = useState(false);  
 
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


  const getDashboard = async () => {
    try {
      setLoading(true); 
      const response = await axiosInstance.get("admin/dashboard");
      if (response.data) {
        console.log(response.data);
        setDataDashboard(response.data.data);
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
    getDashboard();
  }, []);


  return (
    <div className="w-full max-h-full min-h-screen bg-[#fafafa]">
      <div className="dashboard-div  relative lg:ml-[260px] px-3 top-[20px] h-full">
        <p className="text-3xl text-black font-bold">
          Welcome                  
        </p>
        <div className="date_description flex flex-wrap gap-2 items-center mt-2">
        <p className="mb-0 font-semibold text-black text-lg">{currentDate}.</p>

          <p className="mb-0 text-[#535355]">
            Here is a quick snnapshot of the overall business
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <TailSpin height={50} width={50} color="#0066a5" ariaLabel="loading" />
          </div>
        ) : (
        <div className="overViews flex flex-wrap w-full mt-4">
          <div className="p-2 lg:w-1/3 md:w-1/3 w-full">
            <div className="rounded-xl bg-white border shadow-md px-5 py-10">
              <p className="text-3xl text-[#c90000] font-semibold">All Users</p>
              <p className="text-4xl mt-3 font-semibold text-[#003a5f]">
                {dataDashboard.allUsers}
              </p>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/3 w-full">
            <div className="rounded-xl bg-white shadow-md border px-5 py-10">
              <p className="text-3xl text-[#c90000] font-semibold">
                Inspector
              </p>
              <p className="text-4xl mt-3 font-semibold text-[#003a5f]">
               {dataDashboard.allInspector}
              </p>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/3 w-full">
            <div className="rounded-xl bg-white shadow-md border px-5 py-10">
              <p className="text-3xl text-[#c90000] font-semibold">
                Total Order
              </p>
              <p className="text-4xl mt-3 font-semibold text-[#003a5f]">
                {dataDashboard.totalOrdera}
              </p>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/3 w-full">
            <div className="rounded-xl bg-white shadow-md border px-5 py-10">
              <p className="text-3xl text-[#c90000] font-semibold">
                Total Active Order
              </p>       
              <p className="text-4xl mt-3 font-semibold text-[#003a5f]">
                {dataDashboard.activeOrdera}
              </p>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
