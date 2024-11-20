import React, { useEffect, useState } from "react";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";

function AddInspectorModal() {
  const { openAssignInspector, setOpenAssignInspector, orderId, setOrderId, inspectorIdForAssign, setInspectorIdForAssign, orderToast, setOrderToast } = useMyContext();
  const [allInspectors, setAllInspectors] = useState([]);

  const getAllInspectors = async () => {
    try {
      const response = await axiosInstance.get("admin/get-all-inspector");
      if (response.data) {
        console.log(response.data);
        setAllInspectors(response.data.inspector);
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
    getAllInspectors();
  }, []);

console.log(inspectorIdForAssign)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axiosInstance.post("admin/assign-inspector", {
          order_id: orderId,
            inspector_id: inspectorIdForAssign
        });
        if (response.data) {
          setOrderToast(1);
            console.log(response.data.oredr);
            setOpenAssignInspector(false);
        }
    } catch (error) {
        if (error.response) {
          setOrderToast(2);
            console.log(error.response);
        } else {
            console.log(error);
        }
    }
}


  return (
    <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
      <div className="flex items-center justify-center py-10 w-full min-h-screen ">
        <div className="bg-[#ffff] rounded-xl w-[0%]\ sm:w-[40rem] p-3 flex flex-col items-center justify-center gap-2">
          <h1 className="xs:text-[1.5rem] text-[1.2rem] sm:text-[2rem] font-medium">
            Assign Technician
          </h1>
          <form onSubmit={handleSubmit} className="w-full p-6 flex flex-col gap-3">
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="w-[100%]">
                <p className="mb-1 font-medium">Assign Technician</p>
                <select
                  name=""
                  id=""
                  onChange={(e) => setInspectorIdForAssign(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg border shadow-sm"
                >
                  <option value="">Select Technician</option>
                   {allInspectors.map((data,index)=>(
                  <option value={data.inspector.id ? data.inspector.id : ""} key={index}>{data.name}</option>
                ))}
                </select>
              </div>
            </div>
            <div className="font-medium flex items-center justify-center gap-3 mt-3">
              <button
                type="reset"
                onClick={() => setOpenAssignInspector(false)}
                className="w-[60%] sm:w-[35%] md:w-[40%] border shadow-sm py-3 rounded bg-white font-semibold text-black"
              >
                Cancel
              </button>
              <button className="w-[60%] sm:w-[35%] md:w-[40%] py-3 rounded shadow-sm font-semibold bg-[#c90000] text-white">
                Assign
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddInspectorModal;
