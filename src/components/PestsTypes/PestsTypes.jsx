import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import SearchIcon from "./assets/search-icon.png";
import Edit from "./assets/edit-btn.png";
import Delete from "./assets/delete-btn.png";
import Add from "./assets/add-icon.png";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";
import { TailSpin } from "react-loader-spinner";
import LeftArrow from "./assets/left-arrow.png";
import RightArrow from "./assets/right-arrow.png";

function PestsTypes() {
  const {
    setOpenAddPest,
    setOpenEditPest,
    setOpenDeletePest,
    openAddPest,
    openEditPest,
    setPestId,
    openDeletePest,
    setPestName,
    pestToast,
    setPestToast,
  } = useMyContext();
  const [allPests, setAllPests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const notify = () => toast.success("Pest Added Successfully");
  const notifyError = () => toast.error("Pest Not Added");

  const notifyDelete = () => toast.success("Pest Deleted Successfully");
  const notifyDeleteError = () => toast.error("Pest Not Deleted");

  const notifyEdit = () => toast.success("Pest Updated Successfully");
  const notifyEditError = () => toast.error("Pest Not Updated");

  const getAllPests = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("get-all-pest-types");
      if (response.data) {
        console.log(response.data);
        setAllPests(response.data.pestTypes);
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
    getAllPests();
  }, []);
  useEffect(() => {
    getAllPests();
  }, [openAddPest]);
  useEffect(() => {
    getAllPests();
  }, [openEditPest]);
  useEffect(() => {
    getAllPests();
  }, [openDeletePest]);

  useEffect(() => {
    if (pestToast === 1) {
      notify();
      setPestToast(0);
    } else if (pestToast === 2) {
      notifyError();
      setPestToast(0);
    } else if (pestToast === 3) {
      notifyDelete();
      setPestToast(0);
    } else if (pestToast === 4) {
      notifyDeleteError();
      setPestToast(0);
    } else if (pestToast === 5) {
      notifyEdit();
      setPestToast(0);
    } else if (pestToast === 6) {
      notifyEditError();
      setPestToast(0);
    } else {
    }
  }, [pestToast]);

  // search code start

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = allPests.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return item.title?.toLowerCase().includes(lowerCaseSearchTerm);
  });

  // serch code end

  // pagination satrt

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(allPests.length / usersPerPage);
  const totalUsers = allPests.length;

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
      <div className="allPestss-div relative  lg:ml-[260px] px-3 top-[20px]">
        <div className="users-nav w-full flex flex-wrap justify-between">
          <div className="active-block-brns xl:w-[40%] lg:w-[100%] mt-2"></div>
          <div className="user-add-search-div xl:w-[60%] lg:w-[100%] mt-2 flex justify-end">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setOpenAddPest(true)}
                className="w-[180px] h-[50px] flex justify-center gap-2 items-center bg-[#003a5f] text-white text-lg font-semibold shadow-sm rounded"
              >
                <img src={Add} className="w-[15px]" alt="" />
                Add Pest
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
              <table className="w-full min-w-[300px] bg-transparent text-center shadow-sm overflow-hidden">
                <thead className="text-sm">
                  <tr>
                    <th className="px-0">
                      <p className="py-3 text-start ps-8 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 me-12 shadow-md">
                        <span className="">Pest Type</span>
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
                  {/* {Array.isArray(allPests) && allPests.length > 0 ? (
                    currentUsers.map((data, index) => ( */}
                  {filteredUsers.length > 0 ? (
                    currentUsers.map((data, index) => (
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
                                setOpenEditPest(true);
                                setPestId(data.id), setPestName(data.title);
                              }}
                            >
                              <img src={Edit} className="w-[30px]" alt="" />
                            </button>
                            <button
                              onClick={function () {
                                setPestId(data.id), setOpenDeletePest(true);
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
                      <td colSpan="5">No Pests found.</td>
                    </tr>
                  )}
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

export default PestsTypes;
