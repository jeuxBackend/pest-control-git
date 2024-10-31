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

  const [images, setImages] = useState(() => {
    const storedImages = localStorage.getItem("images");
    return storedImages ? JSON.parse(storedImages) : [];
  });

  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(images));
  }, [images]);

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

  const [openLogout, setOpenLogout] = useState(false);
  const [openAddInspector, setOpenAddInspector] = useState(false);
  const [openEditInspector, setOpenEditInspector] = useState(false);
  const [openDeleteInspector, setOpenDeleteInspector] = useState(false);
  const [openCreateOrder, setOpenCreateOrder] = useState(false);
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [openAssignInspector, setOpenAssignInspector] = useState(false);

  return (
    <MyContext.Provider
      value={{
        images,
        setImages,
        pageHeading,
        setPageHeading,
        openLogout,
        setOpenLogout,
        openAddInspector,
        setOpenAddInspector,
        openEditInspector,
        setOpenEditInspector,
        openDeleteInspector,
        setOpenDeleteInspector,
        openCreateOrder,
        setOpenCreateOrder,
        openOrderDetail,
        setOpenOrderDetail,
        openAssignInspector,
        setOpenAssignInspector,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
