import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMyContext } from "../../Context/Context";
import DeleteImage from "./assets/delete-image.png";
import axiosInstance from "../../axiosInstance/axioisInstance";

function DelClient() {
    const { userId,setOpenDelUser } = useMyContext();

    console.log(userId);
    const notify =(e)=> toast.success(e)

    const [loading, setLoading]=useState(false)

    const handleSubmit = async ()=>{
      setLoading(true)
  
      try{
        const response = await axiosInstance.post("admin/delete-inspector",{
          user_id:userId?.id
        })
        if(response.data){
          notify('Client deleted')
           console.log(response.data);
           setOpenDelUser(false)
        }
      }
      catch(error){
      
         if(error.response){
          console.log(error.response);
         }
         else{
          console.log(error);
         }
      }finally{
        setLoading(false)
      };
    }
  
   
  
  
    return (
      <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
        <Toaster />
        <div className="flex items-center justify-center py-10 w-full min-h-screen ">
          <div className="bg-[#ffff] rounded-xl w-[0%]\ sm:w-[40rem] p-3 flex flex-col items-center justify-center gap-2">
            {/* <form className="w-full p-6 flex flex-col gap-3"> */}
              <div className="flex items-center justify-center">
                <img src={DeleteImage} className="w-[130px]" alt="" />
              </div>
              <div className="text-center w-full">
                <p className="text-2xl text-[#003a5f] font-bold">Delete</p>
              </div>
              <div className="flex justify-center px-10">
                <p className="text-[#89959a] text-lg fon-[500] w-full text-center">
                  Are you sure you want to delete.
                </p>
              </div>
              <div className="font-medium flex items-center justify-center gap-3 mt-3 w-full">
                <button
                  onClick={() => setOpenDelUser(false)}
                  className="w-[60%] sm:w-[35%] md:w-[40%] border shadow-sm py-3 rounded bg-white font-semibold text-black"
                >
                  Cancel
                </button>
                <button onClick={handleSubmit}  className="w-[60%] sm:w-[35%] md:w-[40%] py-3 rounded shadow-sm font-semibold bg-[#c90000] text-white">
                  {loading?"Loading...":"Delete"}
                </button>
              </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    );
}

export default DelClient