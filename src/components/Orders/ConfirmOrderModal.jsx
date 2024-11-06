import React from "react";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";

function ConfirmOrderModal() {
  const { openConfirmModal, setOpenConfirmModal, activeOrderId } = useMyContext();


  
  const handleSubmit = async (Id)=>{
  
    try{
      const response = await axiosInstance.get(`admin/confirm-order/${Id}`)
      if(response.data){
         console.log(response.data);
         setOpenConfirmModal(false)
      }
    }
    catch(error){
       if(error.response){
        console.log(error.response);
       }
       else{
        console.log(error);
       }
    }
  }


  return (
    <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
      <div className="flex items-center justify-center py-10 w-full min-h-screen ">
        <div className="bg-[#ffff] rounded-xl w-[0%]\ sm:w-[40rem] p-3 flex flex-col items-center justify-center gap-2">
          {/* <form className="w-full p-6 flex flex-col gap-3"> */}
          <div className="text-center w-full">
            <p className="text-2xl text-[#003a5f] font-bold">Confirm Order</p>
          </div>
          <div className="flex justify-center px-10">
            <p className="text-[#89959a] text-lg fon-[500] w-full text-center">
              Are you sure you want to confirm order.
            </p>
          </div>
          <div className="font-medium flex items-center justify-center gap-3 mt-3 w-full">
            <button
              onClick={() => setOpenConfirmModal(false)}
              className="w-[60%] sm:w-[35%] md:w-[40%] border shadow-sm py-3 rounded bg-white font-semibold text-black"
            >
              No
            </button>
            <button onClick={() => handleSubmit(activeOrderId)} className="w-[60%] sm:w-[35%] md:w-[40%] py-3 rounded shadow-sm font-semibold bg-[#c90000] text-white">
              Yes
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrderModal;
