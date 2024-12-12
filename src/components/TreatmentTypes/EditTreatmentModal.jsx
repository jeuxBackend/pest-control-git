import React, { useEffect, useState } from "react";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";
import toast from "react-hot-toast";

function EditTreatmentModal() {
  const { openEditTreatment, setOpenEditTreatment, treatmentName, setTreatmentName, treatmentId, setTreatmentId, setTreatmentToast,treatmentDescription, setTreatmentDescription } = useMyContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const notifyError = (e)=> toast.error(e)

  useEffect(() => {
    setName(treatmentName);
    setDescription(treatmentDescription?treatmentDescription:"");  
    
  }, [treatmentName,treatmentDescription]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axiosInstance.post("update-treatment-types", {
            id: treatmentId,
            title: name,
            description: description
        });
        if (response.data) {
          setTreatmentToast(5);
            console.log(response.data.treatmentType);
            setOpenEditTreatment(false);
        }
    } catch (error) {
        if (error.response) {
          // setTreatmentToast(6);
          notifyError(error?.response?.data?.errors?.title)

            console.log(error.response);
        } else {
            console.log(error);
        }
    }
}

  return (
    <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
      <div className="flex items-center justify-center py-10 w-full min-h-screen ">
        <div className="bg-[#ffff] rounded-xl w-[0%]\ sm:w-[40rem] pt-3 px-3 flex flex-col items-center justify-center gap-2">
          <h1 className="xs:text-[1.5rem] text-[1.2rem] sm:text-[2rem] mb-[-22px] font-medium">
            Update Treatment
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full p-6 flex flex-col gap-3"
          >
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="lg:w-[100%] w-[100%]">
                <p className="mb-1 font-medium">Treatment Name</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full py-3 px-4 rounded-xl border shadow-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="lg:w-[100%] w-[100%]">
                <p className="mb-1 font-medium">Description</p>
                <textarea
                
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Treatment description"
                  rows={5}
                  className="w-full py-3 px-4 rounded-xl border shadow-sm"
                />
              </div>
            </div>
            <div className="font-medium flex items-center justify-center lg:gap-x-8 gap-3 mt-3">
              <button
                type="reset"
                onClick={() => setOpenEditTreatment(false)}
                className="w-[60%] sm:w-[35%] md:w-[40%] border shadow-sm py-3 rounded bg-white font-semibold text-black"
              >
                Cancel
              </button>
              <button className="w-[60%] sm:w-[35%] md:w-[40%] py-3 rounded shadow-sm font-semibold bg-[#c90000] text-white">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTreatmentModal;
