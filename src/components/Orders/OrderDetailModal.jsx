import React, { useState } from "react";
import { useMyContext } from "../../Context/Context";
import { Link } from "react-router-dom";

function OrederDetailModal() {
  const { pageHeading, setPageHeading, setOpenOrderDetail } = useMyContext();

  return (
    <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
      <div className="flex items-center justify-center py-10 w-full min-h-screen ">
        <div className="bg-[#ffff] rounded-lg w-[0%]\ sm:w-[40rem] p-3 flex flex-col items-center justify-center gap-2">
          <h1 className="xs:text-[1.5rem] text-[1.2rem] sm:text-[2rem] font-medium">
            Order Detail
          </h1>
          <div className="w-full p-6 flex flex-col gap-3">
            <div className="flex justify-between pb-3 border-b-2 border-dashed">
              <p className="text-lg font-semibold">Vincent Ceelen</p>
              <span className="leading-none text-end">
                <p className="text-sm">August 2, 2013</p>
                <p className="text-sm">06:42 am</p>
              </span>
            </div>
            <div className="flex justify-between pb-3 border-b-2 border-dashed">
              <div className="">
                <span className="text-[#00000067] font-semibold">Phone no: </span>
                <span className="text-black">04</span>
              </div>
              <div className="">
                <span className="text-[#00000067] font-semibold">Pest Type: </span>
                <span className="text-black">Ants</span>
              </div>
            </div>
            <div className="flex justify-between pb-3 border-b-2 border-dashed">
              <div className="">
                <span className="text-[#00000067] font-semibold">Location: </span>
                <span className="text-black">4517 washington Ave. Manchester, Kentucky 39495</span>
              </div>
            </div>
            <div className="flex justify-between pb-3">
              <div className="">
                <span className="text-black font-semibold">Description: </span>
                <span className="text-[#00000067]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat aspernatur doloribus, eligendi perspiciatis ut, veritatis quidem cum architecto deleniti amet autem soluta eos placeat expedita quas consequatur ratione quos recusandae! Perspiciatis ex expedita reiciendis sapiente ut? Id nostrum temporibus magni, asperiores incidunt sed reprehenderit enim debitis neque totam libero dolores nam harum maxime, vel, doloremque assumenda aliquid sapiente quo quibusdam! Maxime quia adipisci nisi? Tempora cum eligendi earum et totam perferendis, voluptas aut possimus natus quas, eos dicta, deserunt distinctio maxime quo voluptate itaque odio provident voluptatibus eaque enim. Fugit illum cupiditate ad saepe beatae, exercitationem dicta ipsam quaerat in.</span>
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
              <Link className="w-[60%] sm:w-[35%] md:w-[40%] py-3 rounded shadow-sm font-semibold bg-[#003a5f] text-white"
              to={"/Orders-Detail"}
                    onClick={function (){setPageHeading("Inspection Report"); setOpenOrderDetail(false)}}
              >
              <div className="flex justify-center">
                Inspection Report
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrederDetailModal;
