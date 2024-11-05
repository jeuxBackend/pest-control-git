import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import { useMyContext } from "../Context/Context";
// import { useMyContext } from '../Context/Context';

function MainModule() {
  const { openAddInspector, openEditInspector, openOrderDetail} = useMyContext();

  //   const { openAddUser, setOpenAddUser} = useMyContext();

    const navigate = useNavigate();

    useEffect(() => {
  const token = localStorage.getItem('PestToken');

  if (!token) {
  // Redirect to login if the token is not found
    navigate('/');
  }
    }, [navigate]);

  return (
    <div  className={`${openAddInspector===true || openEditInspector===true || openOrderDetail===true ? "h-screen overflow-hidden":""}`}>
      <SideBar />

      <Outlet />
    </div>
  );
}

export default MainModule;
