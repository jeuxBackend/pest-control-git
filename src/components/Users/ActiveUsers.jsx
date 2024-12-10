import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ActiveColorWhite from "./assets/active-color-white.png";
import BlockColor from "./assets/block-color.png";
import Block from "./assets/block.png";
import SearchIcon from "./assets/search-icon.png";
import LeftArrow from "./assets/left-arrow.png";
import RightArrow from "./assets/right-arrow.png";
import UserPic from "./assets/user-pic.png";
import UserPic2 from "./assets/user-pic2.png";
import UserPic3 from "./assets/user-pic3.png";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";
import { TailSpin } from "react-loader-spinner";
import del from "./assets/del.svg"
import delRed from "./assets/del-red.svg"
import atoz from "/atoz.svg"
import ztoa from "/ztoa.svg"

const ActiveUsers = () => {
  const { pageHeading, setPageHeading,userId, setUserId,setOpenActiveUser,setOpenDelUser } = useMyContext();
  const [activeUser, setActiveUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [sort, setSort] = useState(false);
  const [loading, setLoading] = useState(false);

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
  useEffect(() => {
    getActiveUsers();
  }, []);

  const changeUserStatus = async (changeStatus) => {
    try {
      const response = await axiosInstance.post(`admin/user-toggle`, {
        id: changeStatus,
      });
      if (response.data) {
        notify();
        console.log(response.data);
        getActiveUsers();
      }
    } catch (error) {
      if (error.response) {
        notifyError();
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

  const filteredUsers = activeUser.filter((item) => {
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
  const totalPages = Math.ceil(activeUser.length / usersPerPage);
  const totalUsers = activeUser.length;

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
    <div className="w-full h-full min-h-screen poppins bg-[#fafafa] pb-[20px]">
      <div className="activeUsers-div relative  lg:ml-[260px] px-3 top-[20px]">
        <div className="users-nav w-full flex flex-wrap justify-between">
          <div className="active-block-brns xl:w-[60%] lg:w-[100%] mt-2">
            <ul className="flex flex-wrap gap-3">
              <li>
                <a className="flex justify-center py-2 border border-[#003a5f] bg-[#003a5f] shadow-sm font-semibold w-[180px] h-[50px] text-lg rounded text-[#ffff] cursor-pointer">
                  <div className="flex gap-x-2 items-center">
                    <img
                      className="w-[20px]"
                      src={ActiveColorWhite}
                      alt="active Icon"
                    />
                    Active Users
                  </div>
                </a>
              </li>
              <li>
                <Link
                  to={"/Inactive-Users"}
                  onClick={() => setPageHeading("Inactive Users")}
                  className="flex justify-center py-2 border shadow-sm font-semibold w-[180px] h-[50px] text-lg rounded text-[#828282] bg-transparent cursor-pointer"
                >
                  <div className="flex gap-x-2 items-center">
                    <img className="w-[20px]" src={Block} alt="active Icon" />
                    Inactive Users
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to={"/Delete-Users"}
                  onClick={() => setPageHeading("Delete Users")}
                  className="flex justify-center py-2 border shadow-sm font-semibold w-[180px] h-[50px] text-lg rounded text-[#828282] bg-transparent cursor-pointer"
                >
                  <div className="flex gap-x-2 items-center">
                    <img className="w-[20px]" src={del} alt="active Icon" />
                    Delete
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="user-add-search-div xl:w-[40%] lg:w-[100%] mt-2 flex justify-end">
            <div className="flex flex-wrap gap-3">
              <div className="search-box flex gap-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="bg-transparent text-black border h-[50px] lg:w-[300px] md:w-[300px] w-[230px] rounded ps-3"
                  placeholder="Search"
                />
                <button onClick={()=>setSort(!sort)} className="h-[50px] w-[50px] bg-[#c90000] rounded flex justify-center items-center">
                  <img src={sort? ztoa:atoz} className="w-[22px]" alt="" />
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
                        <span className="">User Details</span>
                      </p>
                    </th>
                    <th className="px-0">
                      <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 shadow-md mx-6">
                        Email
                      </p>
                    </th>
                    <th className="px-0">
                      <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 mx-6 shadow-md">
                        Location
                      </p>
                    </th>
                    <th className="px-0">
                      <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 mx-6 shadow-md">
                        Date
                      </p>
                    </th>
                    <th className="px-0">
                      <p className="py-3 bg-[#f7f8f8] text-[#8b8e9c] border-b border-r mb-5 mx-6 shadow-md">
                        Status
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
                            <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                              <img
                                src={data.profile_pic}
                                alt="user"
                                className="w-full border bg-white h-full object-cover"
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
                          <p className="text-black px-8">{data.email}</p>
                        </td>
                        <td className="py-3 border-b border-r">
                          <p className="text-black px-8">{data.address ?data.address:<span className="text-red-500">Not Available</span>}</p>
                        </td>
                        <td className="py-3 border-b border-r">
                        <p className="text-black px-8">{data.created_at.split('T')[0]} </p>

                        </td>
                        <td className="py-3 px-5 border-b border-r">
                          <div className="flex justify-center gap-2">
                            <button
                             onClick={function(){ setUserId({id:data.id,type:"Active"}),setOpenActiveUser(true)}}
                              className="px-5 py-2 text-[#c90000] text-lg font-semibold rounded-full bg-[#fededc] flex justify-center items-center gap-3"
                            >
                              <img
                                src={BlockColor}
                                className="w-[18px]"
                                alt=""
                              />{" "}
                              Block
                            </button>
                            <button
                             
                              className="px-3 py-3 text-[#ff2f16] text-lg font-semibold rounded-full bg-[#fededc] flex justify-center items-center gap-3"
                              onClick={()=>setOpenDelUser(true)}
                            >
                              <img
                                src={delRed}
                                className="w-[18px]"
                                alt=""
                              />
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
      <Toaster />
    </div>
  );
};

export default ActiveUsers;
