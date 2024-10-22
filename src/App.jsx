import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Dashboard from "./components/dashboard/dashboard";
import AllUsers from "./components/Users/AllUsers";
import MainModule from "./Modules/MainModule";
import ActiveUsers from "./components/Users/ActiveUsers";
import BlockUsers from "./components/Users/BlockUsers";
import AddInspectorModal from "./components/Inspector/AddInspectorModal";
import LogoutModal from "./components/SideBar/LogoutModal";
import { useMyContext } from "./Context/Context";
import Inspector from "./components/Inspector/Inspector";
import EditInspectorModal from "./components/Inspector/EditInspectorModal";
import DeleteInspectorModal from "./components/Inspector/DeleteInspectorModal";

function App() {
  const { openLogout, openAddInspector, openEditInspector, openDeleteInspector } = useMyContext();
  return (
    <>
      <div className={`${openLogout === true ? "" : "hidden"}`}>
        <LogoutModal />
      </div>
      <div className={`${openAddInspector === true ? "" : "hidden"}`}>
        <AddInspectorModal />
      </div>
      <div className={`${openEditInspector === true ? "" : "hidden"}`}>
        <EditInspectorModal />
      </div>
      <div className={`${openDeleteInspector === true ? "" : "hidden"}`}>
        <DeleteInspectorModal />
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainModule />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/All-Users" element={<AllUsers />} />
          <Route path="/Active-Users" element={<ActiveUsers />} />
          <Route path="/Block-Users" element={<BlockUsers />} />
          <Route path="/Inspector" element={<Inspector />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
