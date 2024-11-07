import React, { useEffect } from "react";
import { useState } from "react";
import SearchIcon from "./assets/search-icon.png";
import Edit from "./assets/edit-btn.png";
import Delete from "./assets/delete-btn.png";
import Add from "./assets/add-icon.png";
import LeftArrow from "./assets/left-arrow.png";
import RightArrow from "./assets/right-arrow.png";
import UserPic from "./assets/user-pic.png";
import UserPic2 from "./assets/user-pic2.png";
import UserPic3 from "./assets/user-pic3.png";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

function Inspector() {
  const {
    setOpenAddInspector,
    setOpenEditInspector,
    openEditInspector,
    setOpenDeleteInspector,
    openDeleteInspector,
    openAddInspector,
    setInspectorId,
    setInspectorData,
    toaster,
    setToaster,
  } = useMyContext();
  const [allInspectors, setAllInspectors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [loading, setLoading] = useState(false);  


  const notify = () => toast.success("Inspector Added Successfully");
  const notifyError = () => toast.error("Inspector Not Added");

  const notifyDelete = () => toast.success("Inspector Deleted Successfully");
  const notifyDeleteError = () => toast.error("Inspector Not Deleted");

  const notifyEdit = () => toast.success("Inspector Updated Successfully");
  const notifyEditError = () => toast.error("Inspector Not Updated");

  useEffect(() => {
    if (toaster === 1) {
      notify();
      setToaster(0);
    } else if (toaster === 2) {
      notifyError();
      setToaster(0);
    } else if (toaster === 3) {
      notifyDelete();
      setToaster(0);
    } else if (toaster === 4) {
      notifyDeleteError();
      setToaster(0);
    } else if (toaster === 5) {
      notifyEdit();
      setToaster(0);
    } else if (toaster === 6) {
      notifyEditError();
      setToaster(0);
    } else {
    }
  }, [toaster]);

  const getAllInspectors = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
  useEffect(() => {
    getAllInspectors();
  }, [openDeleteInspector]);

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

  // search code start

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = allInspectors.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      item.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.email?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.address?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  // serch code end

  // pagination satrt

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(allInspectors.length / usersPerPage);
  const totalUsers = allInspectors.length;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleUsersPerPageChange = (event) => {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Generate options for the dropdown

  const generateOptions = () => {
    const options = [];
    for (let i = 10; i <= totalUsers; i += 10) {
      options.push(i);
    }
    return options;
  };

  // pagination end

  return (
    <div className="w-full h-full min-h-screen bg-[#fafafa]">
      <Toaster />
      <div className="allInspectorss-div relative  lg:ml-[260px] px-3 top-[20px]">
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
                  value={searchTerm}
                  onChange={handleSearchChange}
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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <TailSpin
              height={50}
              width={50}
              color="#0066a5"
              ariaLabel="loading"
            />
          </div>
        ) : (
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
                  {currentUsers.map((data, index) => {
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
                          <p className="text-black px-8">
                            {data.show_password}
                          </p>
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
                                  setOpenDeleteInspector(true);
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
        )}
        {/* pagination code start */}
        <div className="flex justify-between items-center">
          <div className="text-[#00000062]">
            Showing {currentUsers.length} of {totalUsers}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4">
            <div className="flex justify-center ml-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`mx-1 w-[35px] flex justify-center items-center h-[35px] rounded ${
                  currentPage === 1
                    ? "bg-white border-2 rounded text-gray-400 cursor-not-allowed"
                    : "bg-white border rounded text-black"
                }`}
              >
                <img src={LeftArrow} className="w-[20px]" alt="" />
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 w-[35px] h-[35px] rounded ${
                    currentPage === index + 1
                      ? "bg-[#003a5f] text-white"
                      : "bg-white border rounded text-[#00000062]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`mx-1 w-[35px] flex justify-center items-center h-[35px] rounded ${
                  currentPage === totalPages
                    ? "bg-white border-2 rounded text-gray-400 cursor-not-allowed"
                    : "bg-white border rounded text-black"
                }`}
              >
                <img src={RightArrow} className="w-[20px]" alt="" />
              </button>
            </div>
          </div>
          {/* Dropdown for selecting number of entries */}
          <div className="flex items-center gap-x-2 justify-center mt-4">
            <p className="text-[#00000062]">Show</p>
            <div className="border px-2 py-2 bg-white rounded">
              <select
                value={usersPerPage}
                onChange={handleUsersPerPageChange}
                className="border-0 text-[#00000062]"
              >
                {generateOptions().map((option) => (
                  <option key={option} value={option}>
                    {option} entries
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* pagination code end */}
      </div>
    </div>
  );
}

export default Inspector;
