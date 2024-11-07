import React, { useState } from "react";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";

function AddPestModal() {
  const { openAddPest, setOpenAddPest, setPestToast } = useMyContext();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("create-pest-types", {
        title: name,
      });
      if (response.data) {
        setPestToast(1);
        console.log(response.data);
        setOpenAddPest(false);
        setName("");
      }
    } catch (error) {
      if (error.response) {
        setPestToast(2);
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
      <div className="flex items-center justify-center py-10 w-full min-h-screen ">
        <div className="bg-[#ffff] rounded-xl w-[0%]\ sm:w-[40rem] pt-3 px-3 flex flex-col items-center justify-center gap-2">
          <h1 className="xs:text-[1.5rem] text-[1.2rem] sm:text-[2rem] mb-[-22px] font-medium">
            Add Pest
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full p-6 flex flex-col gap-3"
          >
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="lg:w-[100%] w-[100%]">
                <p className="mb-1 font-medium">Pest Name</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full py-3 px-4 rounded-xl border shadow-sm"
                />
              </div>
            </div>
            <div className="font-medium flex items-center justify-center lg:gap-x-8 gap-3 mt-3">
              <button
                type="reset"
                onClick={() => setOpenAddPest(false)}
                className="w-[60%] sm:w-[35%] md:w-[40%] border shadow-sm py-3 rounded bg-white font-semibold text-black"
              >
                Cancel
              </button>
              <button className="w-[60%] sm:w-[35%] md:w-[40%] py-3 rounded shadow-sm font-semibold bg-[#c90000] text-white">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPestModal;
