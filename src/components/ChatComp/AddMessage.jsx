import React, { useEffect, useState } from "react";
import { useMyContext } from "../../Context/Context";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance/axioisInstance";
import { IoIosCloseCircleOutline } from "react-icons/io";
import dummy from "/dummy.jpg"

function AddMessage() {
    const {
        pageHeading,
        setPageHeading,
        setOpenOrderDetail,
        activeOrderId,
        setActiveOrderId, pestDetails, setPestDetails,setSendMessage,setChatID
      } = useMyContext();
      const [activeUser, setActiveUser] = useState([]);
      const [technicians, setTechnicians] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [currentPage, setCurrentPage] = useState(1);
      const [usersPerPage, setUsersPerPage] = useState(10);
      const [sort, setSort] = useState(false);
      const [loading, setLoading] = useState(false);
      const [userType, setUserType] = useState("user");
    
      const notify = () => toast.success("Status Changed Successfully");
      const notifyError = () => toast.error("Status Not Changed");
    
      const getActiveUsers = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get("admin/get-active-user");
          if (response.data) {
            console.log(response.data);
            setActiveUser(response.data.users);
          }
        } catch (error) {
          if (error.response) {
            console.log(error.response);
          } else {
            console.log(error);
          }
        }
        finally {
          setLoading(false); 
        }
      };
      const getTechnicians = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get("admin/get-all-inspector");
          if (response.data) {
            console.log(response.data);
            setTechnicians(response.data.inspector);
          }
        } catch (error) {
          if (error.response) {
            console.log(error.response);
          } else {
            console.log(error);
          }
        }
        finally {
          setLoading(false); 
        }
      };
      useEffect(() => {
        getActiveUsers();
        getTechnicians()
      }, [setSendMessage]);
    
      
    
      return (
        <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
          <div className="flex items-center justify-center py-10 w-full min-h-screen ">
            <div className="bg-[#ffff] max-h-[90%] overflow-y-auto rounded-lg w-[0%]\ sm:w-[40rem] p-3 flex flex-col items-center justify-center gap-2 relative">
            <IoIosCloseCircleOutline onClick={()=>setSendMessage(false)} className="text-[1.5rem] absolute right-2 top-2 cursor-pointer"/>
              <h1 className="xs:text-[1.5rem] text-[1.2rem] sm:text-[2rem] font-medium text-[#08395f]">
               Send Message
              </h1>
              <div className="btns bg-[#fff] lg:w-[95%] w-full lg:px-3 flex items-center justify-center gap-3 py-1 lg:py-1 px-1 rounded border text-[0.9rem] font-medium mt-3">
              <button
                onClick={() => setUserType("user")}
                className={`py-[0.6rem] ${
                  userType === "user"
                    ? "bg-[#003a5f] shadow-md text-white"
                    : "hover:bg-white hover:shadow-md"
                } w-[50%] px-7 rounded text-center`}
              >
                Client
              </button>
              <button
                onClick={() => setUserType("inspector")}
                className={`py-[0.6rem] ${
                  userType === "inspector"
                    ? "bg-[#003a5f] shadow-md text-white"
                    : "hover:bg-white hover:shadow-md"
                } w-[50%] px-5 rounded text-center`}
              >
                Technician
              </button>
            </div>
            {userType ==='user'?
              <div className="w-full ">
                {activeUser.length>0? activeUser.map((data, index) =>(
                    <div className="flex items-center justify-between border-b-2 border-dashed hover:bg-slate-200 px-2">
                      <div key={index} className="flex items-center justify-start my-3 gap-2">
                        <img src={data?.profile_pic?data?.profile_pic:dummy} loading="lazy" alt="" className="w-[3.5rem] h-[3.5rem] rounded-full object-cover"/>
                        <div className="leading-tight">
                            <p className="text-[1.3rem] font-medium capitalize">{data?.name}</p>
                            <p className="text-[0.9rem] capitalize opacity-50">{data?.role}</p>
                        </div>

                      </div>
                      <div onClick={function(){setChatID(data.id),setSendMessage(false)}} className="bg-[#0062a5] cursor-pointer text-white text-[0.9rem] font-medium py-2 px-2 rounded-lg">Send Message</div>

                      </div>

                )):"No User Found"}
              
              
                
    
                
              </div>:<div className="w-full ">
                {technicians.length>0? technicians.map((data, index) =>(
                    <div className="flex items-center justify-between border-b-2 border-dashed hover:bg-slate-200 px-2">
                      <div key={index} className="flex items-center justify-start my-3 gap-2">
                        <img src={data?.profile_pic?data?.profile_pic:dummy} loading="lazy" alt="" className="w-[3.5rem] h-[3.5rem] rounded-full object-cover"/>
                        <div className="leading-tight">
                            <p className="text-[1.3rem] font-medium capitalize">{data?.name}</p>
                            <p className="text-[0.9rem] capitalize opacity-50">{data?.role}</p>
                        </div>

                      </div>
                      <div onClick={function(){setChatID(data.id),setSendMessage(false)}} className="bg-[#0062a5] cursor-pointer text-white text-[0.9rem] font-medium py-2 px-2 rounded-lg">Send Message</div>

                      </div>

                )):"No Technician Found"}
              
              
                
    
                
              </div>}
            </div>
          </div>
        </div>
      );
}

export default AddMessage