import React, { useEffect } from "react";
import { useState } from "react";
import SearchIcon from "./assets/search-icon.png";
import Edit from "./assets/edit-btn.png";
import Delete from "./assets/delete-btn.png";
import Add from "./assets/add-icon.png";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";

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
  } = useMyContext();
  const [allTreatments, setAllTreatments] = useState([]);

  const getAllTreatments = async () => {
    try {
      const response = await axiosInstance.get("get-all-treatment-types");
      if (response.data) {
        console.log(response.data);
        setAllTreatments(response.data.treatmentTypes);
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
    getAllTreatments();
  }, []);
  useEffect(() => {
    getAllTreatments();
  }, [openAddTreatment]);
  useEffect(() => {
    getAllTreatments();
  }, [openEditTreatment]);
  useEffect(() => {
    getAllTreatments();
  }, [openDeleteTreatment]);

  return (
    <div className="w-full h-full min-h-screen bg-[#fafafa]">
      <div className="AllUsers-div relative  lg:ml-[260px] px-3 top-[20px]">
        <div className="users-nav w-full flex flex-wrap justify-between">
          <div className="active-block-brns xl:w-[40%] lg:w-[100%] mt-2"></div>
          <div className="user-add-search-div xl:w-[60%] lg:w-[100%] mt-2 flex justify-end">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setOpenAddTreatment(true)}
                className="w-[180px] h-[50px] flex justify-center gap-2 items-center bg-[#003a5f] text-white text-lg font-semibold shadow-sm rounded"
              >
                <img src={Add} className="w-[15px]" alt="" />
                Add Treatment
              </button>
              <div className="search-box flex gap-3">
                <input
                  type="text"
                  className="bg-transparent text-black border h-[50px] lg:w-[300px] md:w-[300px] w-[230px] rounded ps-3"
                  placeholder="Search"
                />
                <button className="h-[50px] w-[50px] bg-[#c90000] rounded flex justify-center items-center">
                  <img src={SearchIcon} className="w-[22px]" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
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
                  <th className="px-0">
                    <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 mx-6 shadow-md">
                      Action
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {Array.isArray(allTreatments) && allTreatments.length > 0 ? (
                  allTreatments.map((data, index) => (
                    <tr key={index} className="">
                      <td className="py-3 border-b border-r">
                        <div className="flex items-center justify-start ps-6 gap-x-3">
                          <p className="text-lg text-black font-semibold">
                            {data.title}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 border-b border-r lg:px-10">
                        <div className="flex gap-x-3 justify-center">
                          <button
                            onClick={function () {
                              setOpenEditTreatment(true);
                              setTreatmentId(data.id),
                              setTreatmentName(data.title);
                            }}
                          >
                            <img src={Edit} className="w-[30px]" alt="" />
                          </button>
                          <button
                            onClick={function () {
                                setTreatmentId(data.id),
                              setOpenDeleteTreatment(true);
                            }}
                          >
                            <img src={Delete} className="w-[30px]" alt="" />
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
      </div>
    </div>
  );
}

export default PestsTypes;
