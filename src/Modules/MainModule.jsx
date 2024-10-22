import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import { useMyContext } from "../Context/Context";
// import { useMyContext } from '../Context/Context';

function MainModule() {
  const { openAddUser, setOpenAddUser} = useMyContext();

  //   const { openAddUser, setOpenAddUser} = useMyContext();

  //   const navigate = useNavigate();

  //   useEffect(() => {
  // const token = localStorage.getItem('TaxToken');

  // if (!token) {
  // Redirect to login if the token is not found
  //   navigate('/');
  // }
  //   }, [navigate]);

  return (
    <div  className={`${openAddUser===true?"h-screen overflow-hidden":""}`}>
      <SideBar />

      <Outlet />
    </div>
  );
}

export default MainModule;
