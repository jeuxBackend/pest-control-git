import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context
const MyContext = createContext();

// Custom hook to use the context
export const useMyContext = () => useContext(MyContext);

// Context provider component
export const MyContextProvider = ({ children }) => {
  const [documentID, setDocumentID] = useState(() => {
    const saveddocumentID = localStorage.getItem("documentId");
    return saveddocumentID ? JSON.parse(saveddocumentID) : null;
  });

  useEffect(() => {
    if (documentID !== null) {
      localStorage.setItem("documentId", JSON.stringify(documentID));
    }
  }, [documentID]);

  const [pageHeading, setPageHeading] = useState(() => {
    const savedPageHeading = localStorage.getItem("pageHeading");
    return savedPageHeading ? JSON.parse(savedPageHeading) : "Dashboard";
  });
  useEffect(() => {
    if (pageHeading !== null) {
      localStorage.setItem("pageHeading", JSON.stringify(pageHeading));
    }
  }, [pageHeading]);

  const [openLogout, setOpenLogout] = useState(false)
  const [openAddInspector, setOpenAddInspector] = useState(false)
  const [openEditInspector, setOpenEditInspector] = useState(false)
  const [openDeleteInspector, setOpenDeleteInspector] = useState(false)






  return (
    <MyContext.Provider value={{ pageHeading, setPageHeading, openLogout, setOpenLogout, openAddInspector, setOpenAddInspector, openEditInspector, setOpenEditInspector, openDeleteInspector, setOpenDeleteInspector }}>
      {children}
    </MyContext.Provider>
  );
};
