import React, { useEffect } from "react";
import { useState } from "react";
import SearchIcon from "./assets/search-icon.png";
import Edit from "./assets/edit-btn.png";
import Delete from "./assets/delete-btn.png";
import Add from "./assets/add-icon.png";
import UserPic from "./assets/user-pic.png";
import UserPic2 from "./assets/user-pic2.png";
import UserPic3 from "./assets/user-pic3.png";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";

function Inspector() {
  const {
    setOpenAddInspector,
    setOpenEditInspector,
    openEditInspector,
    setOpenDeleteInspector,
    openAddInspector,
    setInspectorId,
    setInspectorData,
  } = useMyContext();
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
  useEffect(() => {
    getAllInspectors();
  }, [openAddInspector]);
  useEffect(() => {
    getAllInspectors();
  }, [openEditInspector]);

  const getInspectorData = async (id) => {
    console.log("Fetching inspector data for ID:", id);
    try {
      const response = await axiosInstance.get(`getInspectorById/${id}`);
      console.log("Inspector Data Response:", response.data);
      if (response.data) {
        setInspectorData(response.data.user);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#fafafa]">
      <div className="AllUsers-div relative  lg:ml-[260px] px-3 top-[20px]">
        <div className="users-nav w-full flex flex-wrap justify-between">
          <div className="active-block-brns xl:w-[40%] lg:w-[100%] mt-2"></div>
          <div className="user-add-search-div xl:w-[60%] lg:w-[100%] mt-2 flex justify-end">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setOpenAddInspector(true)}
                className="w-[180px] h-[50px] flex justify-center gap-2 items-center bg-[#003a5f] text-white text-lg font-semibold shadow-sm rounded"
              >
                <img src={Add} className="w-[15px]" alt="" />
                Add Inspector
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
            <table className="w-full min-w-[800px] bg-transparent text-center shadow-sm overflow-hidden">
              <thead className="text-sm">
                <tr>
                  <th className="px-0">
                    <p className="py-3 text-start ps-8 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 me-12 shadow-md">
                      <span className="">Inspector Details</span>
                    </p>
                  </th>
                  <th className="px-0">
                    <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 shadow-md mx-6">
                      Email
                    </p>
                  </th>
                  <th className="px-0">
                    <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 mx-6 shadow-md">
                      Password
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
                {allInspectors.map((data, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="py-3 border-b border-r">
                        <div className="flex items-center justify-start ps-6 gap-x-3">
                          <div className="w-[50px] h-[50px] rounded-full border overflow-hidden">
                            <img
                              src={data.profile_pic}
                              alt="inspector"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-lg text-black font-semibold">
                              {data.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 border-b border-r">
                        <p className="text-black ">{data.email}</p>
                      </td>
                      <td className="py-3 border-b border-r">
                        <p className="text-black px-8">{data.show_password}</p>
                      </td>
                      <td className="py-3 border-b border-r">
                        <div className="flex gap-x-3 justify-center">
                          <button
                            onClick={function () {
                              setOpenEditInspector(true),
                                setInspectorId(data.id),
                                getInspectorData(data.id);
                            }}
                          >
                            <img src={Edit} className="w-[30px]" alt="" />
                          </button>
                          <button
                            onClick={function () {
                              setInspectorId(data.id),
                                setOpenDeleteInspector(true)
                            }}
                          >
                            <img src={Delete} className="w-[30px]" alt="" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inspector;
