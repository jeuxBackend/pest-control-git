import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
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
import Orders from "./components/Orders/orders";
import OrdersHistory from "./components/Orders/OrdersHistory";
import OrdersDetail from "./components/Orders/OrdersDetail";
import Gallery from "./components/Orders/Gallery";
import ChatComp from "./components/ChatComp/ChatComp";
import OfferModal from "./components/ChatComp/OfferModal"

function App() {
  const { openLogout, openAddInspector, openEditInspector, openDeleteInspector, openOfferModal } = useMyContext();
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
      <div className={`${openOfferModal === true ? "" : "hidden"}`}>
        <OfferModal />
      </div>


      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainModule />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/All-Users" element={<AllUsers />} />
          <Route path="/Active-Users" element={<ActiveUsers />} />
          <Route path="/Block-Users" element={<BlockUsers />} />
          <Route path="/Inspector" element={<Inspector />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Orders-History" element={<OrdersHistory />} />
          <Route path="/Orders-Detail" element={<OrdersDetail />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/ChatComp" element={<ChatComp />} />
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
