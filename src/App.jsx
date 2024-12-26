import { useEffect, useState } from "react";
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
import CreateOrderModal from "./components/ChatComp/CreateOrderModal";
import OrederDetailModal from "./components/Orders/OrderDetailModal";
import ActiveOrders from "./components/Orders/ActiveOrders";
import AssignInspectorModal from "./components/Orders/AssignInspectorModal";
import PestsTypes from "./components/PestsTypes/PestsTypes";
import DeletePestModal from "./components/PestsTypes/DeletePestModal";
import AddPestModal from "./components/PestsTypes/AddPestModal";
import EditPestModal from "./components/PestsTypes/EditPestModal";
import TreatmentTypes from "./components/TreatmentTypes/TreatmentTypes";
import AddTreatmentModal from "./components/TreatmentTypes/AddTreatmentModal";
import EditTreatmentModal from "./components/TreatmentTypes/EditTreatmentModal";
import DeleteTreatmentModal from "./components/TreatmentTypes/DeleteTreatmentModal";
import ConfirmOrderModal from "./components/Orders/ConfirmOrderModal";
import { getToken } from "firebase/messaging";
import { messaging, db, collection, addDoc } from "./Firebase/firebase";
import DeleteUsers from "./components/Users/DeleteUsers";
import ActiveClient from "./components/Users/ActiveClient";
import DelClient from "./components/Users/DelClient";
import PestDetail from "./components/PestsTypes/PestDetail";
import TreatmentDetails from "./components/TreatmentTypes/TreatmentDetails";
import AddMessage from "./components/ChatComp/AddMessage";
import ActivityTracker from "./ActivityTracker/ActivityTracker";
import ForgetPassword from "./auth/ForgetPassword";

function App() {
  const {
    openLogout,
    openAddInspector,
    openEditInspector,
    openDeleteInspector,
    openCreateOrder,
    openOrderDetail,
    openAssignInspector,
    openDeletePest,
    openAddPest,
    openEditPest,
    openEditTreatment,
    openAddTreatment,
    openDeleteTreatment,
    openConfirmModal,
    setOpenActiveUser,
    openActiveUser,
    openDelUser,
    setOpenDelUser,
    pestDetails,
    setPestDetails,
    treatmentDetails,
    setTreatmentDetails,
    sendMessage,
    setSendMessage,
  } = useMyContext();

  const vapidKey =
    "BNhmSaO-9liiuqa4vTmG2OHdOo-dQ3p4vyDyxIeSooW91Xql-7u1WcLskdLZrCqbyfbkBScerH3s1C3BFyeLNP4";

  async function requestPermission() {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
          vapidKey: vapidKey,
          serviceWorkerRegistration: await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js"
          ),
        });

        console.log("Token generated: ", token);
      } catch (error) {
        console.error("Error getting token:", error);
      }
    } else {
      console.error("Notification permission not granted.");
    }
  }

  async function saveTokenToFirestore(token) {
    try {
      const tokensCollection = collection(db, "tokens");
      await addDoc(tokensCollection, { token });
      console.log("Token saved to Firestore!");
    } catch (error) {
      console.error("Error saving token:", error);
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <>
      <ActivityTracker />
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
      {/* <div className={`${openCreateOrder === true ? "" : "hidden"}`}>
        <CreateOrderModal />
      </div> */}

      <div className={`${openOrderDetail === true ? "" : "hidden"}`}>
        <OrederDetailModal />
      </div>
      <div className={`${openAssignInspector === true ? "" : "hidden"}`}>
        <AssignInspectorModal />
      </div>
      <div className={`${openDeletePest === true ? "" : "hidden"}`}>
        <DeletePestModal />
      </div>
      <div className={`${openAddPest === true ? "" : "hidden"}`}>
        <AddPestModal />
      </div>
      <div className={`${openEditPest === true ? "" : "hidden"}`}>
        <EditPestModal />
      </div>
      <div className={`${openAddTreatment === true ? "" : "hidden"}`}>
        <AddTreatmentModal />
      </div>
      <div className={`${openEditTreatment === true ? "" : "hidden"}`}>
        <EditTreatmentModal />
      </div>
      <div className={`${openDeleteTreatment === true ? "" : "hidden"}`}>
        <DeleteTreatmentModal />
      </div>
      <div className={`${openConfirmModal === true ? "" : "hidden"}`}>
        <ConfirmOrderModal />
      </div>
      <div className={`${openActiveUser === true ? "" : "hidden"}`}>
        <ActiveClient />
      </div>
      <div className={`${openDelUser === true ? "" : "hidden"}`}>
        <DelClient />
      </div>
      <div className={`${pestDetails === true ? "" : "hidden"}`}>
        <PestDetail />
      </div>
      <div className={`${treatmentDetails === true ? "" : "hidden"}`}>
        <TreatmentDetails />
      </div>
      <div className={`${sendMessage === true ? "" : "hidden"}`}>
        <AddMessage />
      </div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route element={<MainModule />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/All-Clients" element={<AllUsers />} />
          <Route path="/Active-Clients" element={<ActiveUsers />} />
          <Route path="/Inactive-Clients" element={<BlockUsers />} />
          <Route path="/Delete-Clients" element={<DeleteUsers />} />
          <Route path="/Technician" element={<Inspector />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Orders-History" element={<OrdersHistory />} />
          <Route path="/Orders-Detail" element={<OrdersDetail />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/ChatComp" element={<ChatComp />} />
          <Route path="/Active-Orders" element={<ActiveOrders />} />
          <Route path="/Pests" element={<PestsTypes />} />
          <Route path="/Treatment" element={<TreatmentTypes />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
