import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchIcon from "./assets/search-icon.png";
import Edit from "./assets/edit-btn.png";
import Delete from "./assets/delete-btn.png";
import Add from "./assets/add-icon.png";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";

import { TailSpin } from 'react-loader-spinner';
import atoz from "/atoz.svg"
import ztoa from "/ztoa.svg"
import del from "./assets/del.svg";
import delWhite from "./assets/del-white.svg";
import eye from "./assets/eye.svg";
function PestsTypes() {
  const {
    setOpenAddTreatment,
    openAddTreatment,
    setOpenEditTreatment,
    setOpenDeleteTreatment,
    openAddPest,
    treatmentName,
    setTreatmentName,
    treatmentId,
    setTreatmentId,
    openEditTreatment,
    openDeleteTreatment,
    treatmentToast,
    setTreatmentToast,setDelTechnician,delTechnician,treatmentDetails, setTreatmentDetails,treatmentDescription, setTreatmentDescription
  } = useMyContext();

  const [allTreatments, setAllTreatments] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrder, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
  
  const [sort, setSort] = useState(false);
  const getAllTreatments = async () => {
    if(delTechnician===false){
    try {
      setLoading(true); 
      const response = await axiosInstance.get("get-all-treatment-types");
      if (response.data) {
        console.log(response.data);
        setAllTreatments(response?.data?.treatmentTypes);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setAllTreatments([])
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false); 
    }
  }if(delTechnician){
    try {
      setLoading(true); 
      const response = await axiosInstance.get("admin/showDeleteTreatment");
      if (response.data) {
        console.log(response.data);
        setAllTreatments(response?.data?.treatment);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setAllTreatments([])
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false); 
    }

  }
  };

  useEffect(() => {
    getAllTreatments();
  }, []);
  
  useEffect(() => {
    getAllTreatments();
  }, [openAddTreatment,delTechnician]);

  useEffect(() => {
    getAllTreatments();
  }, [openEditTreatment]);

  useEffect(() => {
    getAllTreatments();
  }, [openDeleteTreatment]);

  const notify = () => toast.success("Treatment Added Successfully");
  const notifyError = () => toast.error("Treatment Not Added");
  const notifyDelete = () => toast.success("Treatment Deleted Successfully");
  const notifyDeleteError = () => toast.error("Treatment Not Deleted");
  const notifyEdit = () => toast.success("Treatment Updated Successfully");
  const notifyEditError = () => toast.error("Treatment Not Updated");

  useEffect(() => {
    if (treatmentToast === 1) {
      notify();
      setTreatmentToast(0);
    } else if (treatmentToast === 2) {
      notifyError();
      setTreatmentToast(0);
    } else if (treatmentToast === 3) {
      notifyDelete();
      setTreatmentToast(0);
    } else if (treatmentToast === 4) {
      notifyDeleteError();
      setTreatmentToast(0);
    } else if (treatmentToast === 5) {
      notifyEdit();
      setTreatmentToast(0);
    } else if (treatmentToast === 6) {
      notifyEditError();
      setTreatmentToast(0);
    }
  }, [treatmentToast]);

  const handleSort = () => {
    const sortedUsers = [...allTreatments].sort((a, b) => {
      if (sort) {
        return b.title.localeCompare(a.title); 
      } else {
        return a.title.localeCompare(b.title); 
      }
    });
    setAllTreatments(sortedUsers);
    setSort(!sort);
  };

  

  // useEffect(() => {
  //   let filteredOrders = searchQuery && searchQuery.trim() !== "" 
  //     ? allTreatments?.filter((order) =>
  //         order.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //     : allTreatments; 
    
  //   setFilteredOrders(filteredOrders);
  // }, [searchQuery, allTreatments]); 
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = allTreatments.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return item.title?.toLowerCase().includes(lowerCaseSearchTerm);
  });

  

  return (
    <div className="w-full h-full min-h-screen bg-[#fafafa]">
      <Toaster />
      <div className="AllUsers-div relative lg:ml-[260px] px-3 top-[20px]">
        <div className="users-nav w-full flex flex-wrap justify-between">
          <div className="active-block-brns xl:w-[40%] lg:w-[100%] mt-2">
          <button
                onClick={() => setDelTechnician(true)}
                className={`w-[130px] h-[50px] flex justify-center gap-2 items-center border  text-lg font-semibold shadow-sm rounded ${delTechnician?"bg-[#C90000] text-white":"text-[#828282]"}`}
              >
                <img src={delTechnician?delWhite:del} className="w-[15px]" alt="" />
                Delete
              </button>
          </div>
          <div className="user-add-search-div xl:w-[60%] lg:w-[100%] mt-2 flex justify-end">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setOpenAddTreatment(true)}
                className={`w-[180px] h-[50px] flex justify-center gap-2 items-center bg-[#003a5f] text-white text-lg font-semibold shadow-sm rounded ${delTechnician?"hidden":""}`}
              >
                <img src={Add} className="w-[15px]" alt="" />
                Add Treatment
              </button>
              <div className="search-box flex gap-3">
                <input
                  type="text"
                  className="bg-transparent text-black border h-[50px] lg:w-[300px] md:w-[300px] w-[230px] rounded ps-3"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSort} className="h-[50px] w-[50px] bg-[#c90000] rounded flex justify-center items-center">
                <img src={sort? ztoa:atoz} className="w-[22px]" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loader code start */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <TailSpin height={50} width={50} color="#0066a5" ariaLabel="loading" />
          </div>
        ) : (
          <div className="All-users-data mt-8">
            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[300px] bg-transparent text-center shadow-sm overflow-hidden">
                <thead className="text-sm">
                  <tr>
                    <th className="px-0">
                      <p className="py-3 text-start ps-8 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 me-12 shadow-md">
                        <span className="">Treatment Type</span>
                      </p>
                    </th>
                    <th className={`px-0 `}>
                      <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 mx-6 shadow-md">
                        Action
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {Array.isArray(allTreatments) && allTreatments.length > 0 ? (
                    filteredUsers?.map((data, index) => (
                      <tr key={index} className="">
                        <td className="py-3 border-b border-r">
                          <div className="flex items-center justify-start ps-6 gap-x-3">
                            <p className="text-lg text-black font-semibold">
                              {data.title}
                            </p>
                          </div>
                        </td>
                        <td className={`py-3 border-b border-r lg:px-10`}>
                          <div className="flex gap-x-3 justify-center">
                            <button
                            className={`${delTechnician?"hidden":""}`}
                              onClick={function () {
                                setOpenEditTreatment(true);
                                setTreatmentId(data.id);
                                setTreatmentName(data.title);
                                setTreatmentDescription(data.description);
                              }}
                            >
                              <img src={Edit} className="w-[30px]" alt="" />
                            </button>
                            <button
                            className={`${delTechnician?"hidden":""}`}
                              onClick={function () {
                                setTreatmentId(data.id);
                                setOpenDeleteTreatment(true);
                                
                              }}
                            >
                              <img src={Delete} className="w-[30px]" alt="" />
                            </button>
                            <button
                              onClick={function () {
                           
                                setTreatmentDetails(true);
                                setTreatmentName(data.title);
                                setTreatmentDescription(data.description);
                              }}
                            >
                              <img src={eye} className="w-[30px]" alt="" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No Treatments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PestsTypes;
