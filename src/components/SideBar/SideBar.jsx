import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SideLogo from "./assets/side-bar-logo.png";
import Dashboard from "./assets/dashboard.png";
import Inspector from "./assets/inspector.png";
import Users from "./assets/users.png";
import Logout from "./assets/logout.png";
import { useMyContext } from "../../Context/Context";

function SideBar() {
  const { pageHeading, setPageHeading } = useMyContext();
  const { openLogout, setOpenLogout } = useMyContext();
  const activeNave = useLocation();
  const [isActive, setActive] = useState();
  useEffect(() => {
    setActive(activeNave.pathname);
  }, [activeNave]);
  const [toggleNav, setNavbarActive] = useState("-translate-x-full");
  const [activeNavbar, setactiveNavbar] = useState("hidden");
  const toggleSidebar = () => {
    if (toggleNav == "-translate-x-full") {
      setNavbarActive("translate-x-0");
      setactiveNavbar("block");
    } else if (toggleNav == "translate-x-0") {
      setNavbarActive("-translate-x-full");
      setactiveNavbar("hidden");
    }
  };
  const handleLinkClick = (heading) => {
    setPageHeading(heading);
    toggleSidebar();
  };
  return (
    <>
      <Navbar
        fluid
        className="border-b border-[#e4e4e441] bg-[#ffff] lg:ps-[272px] poppins"
      >
        <Navbar.Brand className="text-2xl font-semibold py-5 text-black">
          {pageHeading}
        </Navbar.Brand>

        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={[
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
                className="me-3 w-[50px]"
              />,
              <p className="me-3 font-semibold text-[#003a5f]">
                Cameron W. <br />
                <span className="w-full text-start block text-sm mt-1 text-[#c90000]">
                  Admin
                </span>
              </p>,
              // <RiArrowDownSFill className="text-2xl text-[#d2d3d9]" />,
            ]}
          >
            {/* <Dropdown.Item>Settings</Dropdown.Item> */}
            {/* <Dropdown.Divider /> */}
            {/* <Dropdown.Item>Log out</Dropdown.Item> */}
          </Dropdown>
          <Navbar.Toggle
            onClick={toggleSidebar}
            className="ms-2 lg:hidden md:block text-black"
          />
        </div>
      </Navbar>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 lg:z-0 z-50 w-[255px] h-screen transition-transform ${toggleNav} lg:translate-x-0 poppins`}
        aria-label="Sidebar"
      >
        <div className="h-full py-4 pe-5 pt-10 flex justify-between items-center flex-col overflow-y-auto bg-[#0064a5]">
          <div>
            <div className="flex justify-center items-center w-full">
              <img
                src={SideLogo}
                alt=""
                className="w-[215px] bg-white px-3 py-3 rounded-lg ms-5"
              />
            </div>
            <ul className="space-y-7 font-medium mt-10">
              <li className="flex items-center gap-1">
                {isActive === "/Dashboard" && (
                  <span className="inline rounded-r h-full text-5xl w-1 me-3 bg-[#c90000]">
                    &nbsp;
                  </span>
                )}
                <Link
                  onClick={() => handleLinkClick("Dashboard")}
                  to={"/Dashboard"}
                  className={`flex items-center ${
                    isActive === "/Dashboard" ? "bg-[#c90000]" : ""
                  } py-3 ps-5 text-white rounded group w-[215px]`}
                >
                  <img src={Dashboard} alt="" className="w-[20px]" />
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li className="flex items-center gap-1">
                {isActive === "/All-Users" && (
                  <span className="inline rounded-r h-full text-5xl w-1 me-3 bg-[#c90000]">
                    &nbsp;
                  </span>
                )}
                {isActive === "/Active-Users" && (
                  <span className="inline rounded-r h-full text-5xl w-1 me-3 bg-[#c90000]">
                    &nbsp;
                  </span>
                )}
                {isActive === "/Block-Users" && (
                  <span className="inline rounded-r h-full text-5xl w-1 me-3 bg-[#c90000]">
                    &nbsp;
                  </span>
                )}
                <Link
                  onClick={() => handleLinkClick("All Users")}
                  to={"/All-Users"}
                  className={`flex items-center ${
                    isActive === "/All-Users" ||
                    isActive === "/Active-Users" ||
                    isActive == "/Block-Users"
                      ? "bg-[#c90000]"
                      : ""
                  } py-3 ps-5 text-white rounded group w-[215px]`}
                >
                  <img src={Users} alt="" className="w-[20px]" />
                  <span className="ms-3">All Users</span>
                </Link>
              </li>
              <li className="flex items-center gap-1">
                {isActive === "/Inspector" && (
                  <span className="inline rounded-r h-full text-5xl w-1 me-3 bg-[#c90000]">
                    &nbsp;
                  </span>
                )}
                <Link
                  onClick={() => handleLinkClick("Inspector")}
                  to={"/Inspector"}
                  className={`flex items-center ${
                    isActive === "/Inspector" ? "bg-[#c90000]" : ""
                  } py-3 ps-5 text-white rounded group w-[215px]`}
                >
                  <img src={Inspector} alt="" className="w-[20px]" />
                  <span className="ms-3">Inspector</span>
                </Link>
              </li>
              <li className="flex items-center gap-1">
                {isActive === "/ChatComp" && (
                  <span className="inline rounded-r h-full text-5xl w-1 me-3 bg-[#c90000]">
                    &nbsp;
                  </span>
                )}
                <Link
                  onClick={() => handleLinkClick("Chat")}
                  to={"/ChatComp"}
                  className={`flex items-center ${
                    isActive === "/ChatComp" ? "bg-[#c90000]" : ""
                  } py-3 ps-5 text-white rounded group w-[215px]`}
                >
                  <img src={Dashboard} alt="" className="w-[20px]" />
                  <span className="ms-3">Chat</span>
                </Link>
              </li>
              <li className="flex items-center gap-1">
                {isActive === "/Orders" && (
                  <span className="inline rounded-r h-full text-5xl w-1 me-3 bg-[#c90000]">
                    &nbsp;
                  </span>
                )}
                {isActive === "/Orders-History" && (
                  <span className="inline rounded-r h-full text-5xl w-1 me-3 bg-[#c90000]">
                    &nbsp;
                  </span>
                )}
                {isActive === "/Orders-Detail" && (
                  <span className="inline rounded-r h-full text-5xl w-1 me-3 bg-[#c90000]">
                    &nbsp;
                  </span>
                )}
                {isActive === "/Gallery" && (
                  <span className="inline rounded-r h-full text-5xl w-1 me-3 bg-[#c90000]">
                    &nbsp;
                  </span>
                )}
                <Link
                  onClick={() => handleLinkClick("Active Orders")}
                  to={"/Orders"}
                  className={`flex items-center ${
                    isActive === "/Orders" ||
                    isActive === "/Orders-History" ||
                    isActive == "/Orders-Detail" ||
                    isActive == "/Gallery"
                      ? "bg-[#c90000]"
                      : ""
                  } py-3 ps-5 text-white rounded group w-[215px]`}
                >
                  <img src={Users} alt="" className="w-[20px]" />
                  <span className="ms-3">Orders</span>
                </Link>
              </li>

              <li className="flex items-center gap-x-2 ms-5">
                <button
                  onClick={() => {
                    setOpenLogout(true);
                    toggleSidebar();
                  }}
                  className="text-white flex items-center mt-5"
                >
                  <img src={Logout} alt="" className="w-[20px]" />
                  <span className="ms-3">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <div
        onClick={toggleSidebar}
        className={`${activeNavbar} lg:hidden bg-gray-900/50 fixed inset-0 z-40`}
      ></div>
    </>
  );
}

export default SideBar;
