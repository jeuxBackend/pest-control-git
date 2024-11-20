import React, { useEffect, useRef, useState } from "react";
import Add from "./assets/add-icon.png";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";
import { MdDeleteForever } from "react-icons/md";
import { Oval } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

function CreateOrederModal() {
  const { openCreateOrder, setOpenCreateOrder,chatId, setChatID } = useMyContext();
  const [allInspectors, setAllInspectors] = useState([]);
  const [allPests, setAllPests] = useState([]);
  const [allTreatments, setAllTreatments] = useState([]);
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [location, setLocation] = useState("");
  const [inspectorID, setInspectorID] = useState("");
  const [treatmentID, setTreatmentID] = useState("");
  const [pestID, setPestID] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");
  const [sessionID, setSessionID] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState("");
  const [locationsList, setLocationsList] = useState([]);

  const notify = () => toast.error("Creating Order Not Completed");
  

  const clearForm =()=>{
    setLocationsList([])
    setDescription('')
    setInspectorID('')
    setTreatmentID('')
    setPestID('')
    setStartDate('')
    setEndDate('')
    setTime('')
    setSessionID('')
    setNumber('')
  }

  const starting_date= new Date(startDate)
  const ending_date= new Date(endDate)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
   

    try {
      const response = await axiosInstance.post("admin/add-order-by-admin", {
        user_id: chatId,
        inspector_id: inspectorID,
        starting_date: starting_date.getTime(),
        ending_date: ending_date.getTime(),
        number: number,
        time: time,
        pest_type: pestID,
        require_session: sessionID,
        treatment_type: treatmentID,
        description: description,
        location: locationsList
      });
      if (response.data) {
        console.log(response)
        setOpenCreateOrder(false)
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        notify()
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false)
      clearForm()
     
    }
  };

  const getAllInspectors = async () => {
    // setLoading(true);
    try {
      const response = await axiosInstance.get("admin/get-all-inspector");
      if (response.data) {
        console.log(response.data);
        setAllInspectors(response.data.inspector);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getAllInspectors();
  }, []);

  const getAllPests = async () => {
    try {
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
      // setLoading(false);
    }
  };
  useEffect(() => {
    getAllPests();
  }, []);

  const getAllTreatments = async () => {
    try {
      const response = await axiosInstance.get("get-all-treatment-types");
      if (response.data) {
        console.log(response.data);
        setAllTreatments(response.data.treatmentTypes);
      }
    } catch (error) {
      if (error) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    } finally {
    }
  };

  useEffect(() => {
    getAllTreatments();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [apiLoaded, setApiLoaded] = useState(false);

  
  const inputRef = useRef(null);

  const loadGoogleMapsApi = () => {
    const existingScript = document.getElementById("google-maps");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAXD1Odr8R1DL8py6W29ZeImPO-kQdIAdg&libraries=places`;
      script.id = "google-maps";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setApiLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setApiLoaded(true);
    }
  };

  const initAutocomplete = () => {
    if (window.google && window.google.maps && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (place) {
          if (place.geometry) {
            const { lat, lng } = place.geometry.location;
            setLocation({
              address: place.formatted_address,
              lat: lat(),
              lng: lng(),
            });

            console.log("Address:", place.formatted_address);
            console.log("Latitude:", lat());
            console.log("Longitude:", lng());
          } else {
            console.warn("No geometry found for this place.");
          }
        } else {
          console.warn("No place returned by the Autocomplete.");
        }
      });
    }
  };

  const handleAddLocation = () => {
    if (location && location.address) {
      setLocationsList((prev) => [...prev, location]);
      setLocation("");
    }
  };
  const handleRemoveLocation = (index) => {
    setLocationsList((prev) => prev.filter((_, i) => i !== index));
  };

  const preventFormSubmitOnEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    loadGoogleMapsApi();
  });

  useEffect(() => {
    if (apiLoaded) {
      initAutocomplete();
    }
  });

  console.log(locationsList);
  

  return (
    <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
      <div className="flex items-center justify-center py-10 w-full min-h-screen ">
      <Toaster />
        <div className="bg-[#ffff] rounded-lg w-[0%]\ sm:w-[40rem] pt-3 px-3 flex flex-col items-center justify-center gap-2">
          <h1 className="xs:text-[1.5rem] text-[1.2rem] sm:text-[2rem] mb-[-22px] font-medium">
            Create Order
          </h1>
          {loading?<div className="h-[20vh] flex items-center justify-center">
            <Oval
                height={24}
                width={24}
                color="white"
                ariaLabel="loading"
                visible={true}
              />
          </div>:
          <form onSubmit={handleSubmit} className="w-full p-6 flex flex-col gap-3">
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="lg:w-[50%] w-[100%]">
                <p className="mb-1 font-medium">Pest Type</p>
                <div className="border rounded-lg px-2 py-3">
                  <select
                    onChange={(e) => setPestID(e.target.value)}
                    required
                    name=""
                    id=""
                    className="w-full border-0"
                  >
                    <option value="">Select Pest Type</option>
                    {allPests.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="lg:w-[50%] w-[100%]">
                <p className="mb-1 font-medium">Treatment Type</p>
                <div className="border rounded-lg px-2 py-3">
                  <select
                    onChange={(e) => setTreatmentID(e.target.value)}
                    required
                    name=""
                    id=""
                    className="w-full rounded-lg border-0"
                  >
                    <option value="">Select Treatment Type</option>
                    {allTreatments.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="lg:w-[50%] w-[100%]">
                <p className="mb-1 font-medium">Start Date</p>

                <input
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  placeholder="Enter Start Date"
                  className="w-full py-3 px-2 rounded-lg border shadow-sm"
                />
              </div>
              <div className="lg:w-[50%] w-[100%]">
                <p className="mb-1 font-medium">End Date</p>
                <input
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  placeholder="Enter Time"
                  className="w-full py-3 px-2 rounded-lg border shadow-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="lg:w-[50%] w-[100%]">
                <p className="mb-1 font-medium">Required Session</p>
                <div className="border rounded-lg px-2 py-3">
                  <select
                    onChange={(e) => setSessionID(e.target.value)}
                    required
                    name=""
                    id=""
                    className="w-full border-0"
                  >
                    <option value="">Select Sessions</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
              <div className="lg:w-[50%] w-[100%]">
                <p className="mb-1 font-medium">Time</p>
                <input
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                  required
                  placeholder="Enter Time"
                  className="w-full py-3 px-2 rounded-lg border shadow-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="lg:w-[100%] w-[100%]">
                <p className="mb-1 font-medium">Technician</p>
                <div className="border rounded-lg px-2 py-3">
                  <select
                    required
                    onChange={(e) => setInspectorID(e.target.value)}
                    name=""
                    id=""
                    className="w-full rounded-lg border-0"
                  >
                    <option value="">Select Technician</option>
                    {allInspectors.map((data, index) => (
                      <option key={index} value={data.inspector.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="lg:w-[100%] w-[100%]">
                <p className="mb-1 font-medium">Number</p>
                <input
                  type="number"
                  onChange={(e) => setNumber(e.target.value)}
                  required
                  placeholder="Enter Number"
                  className="w-full py-3 px-2 rounded-lg border shadow-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
              <div className="lg:w-[100%] w-[100%]">
                <p className="mb-1 font-medium">Description</p>
                <textarea
                  
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={5}
                  placeholder="Enter Description"
                  className="w-full py-3 px-2 rounded-lg border shadow-sm"
                />
              </div>
            </div>
            <div>
              <div>
                <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
                  <div className="lg:w-[100%] w-[100%]">
                    <div className="flex justify-between">
                      <p className="mb-1 font-medium">Location</p>
                      <div
                        className="h-[20px] w-[20px] bg-[#003a5f] rounded flex justify-center items-center me-1 cursor-pointer"
                        onClick={handleAddLocation}
                      >
                        <img src={Add} className="w-[12px]" alt="" />
                      </div>
                    </div>
                    <input
                      type="text"
                      ref={inputRef}
                      value={location?.address || ""}
                      onChange={(e) =>
                        setLocation({ ...location, address: e.target.value })
                      }
                      onKeyDown={preventFormSubmitOnEnter}
                      placeholder="Enter Location"
                      className="w-full py-3 px-2 rounded-lg border shadow-sm"
                    />
                  </div>
                </div>
               
                <div className="mt-4">
                  {locationsList.map((loc, index) => (
                    <div
                      key={index}
                      className="p-2 mb-2 border rounded shadow-sm bg-gray-100 flex justify-between items-center"
                    >
                      <div>
                        <p>{loc.address}</p>
                      </div>
                      <div
                        className="text-red-500 text-xl font-bold cursor-pointer"
                        onClick={() => handleRemoveLocation(index)}
                      >
                        <MdDeleteForever />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="font-medium flex items-center justify-center gap-3 mt-3">
              <button
                type="reset"
                onClick={() => setOpenCreateOrder(false)}
                className="w-[60%] sm:w-[35%] md:w-[40%] border shadow-sm py-3 rounded bg-white font-semibold text-black"
              >
                Cancel
              </button>
              <button type="submit" className="w-[60%] sm:w-[35%] md:w-[40%] py-3 rounded shadow-sm font-semibold bg-[#c90000] text-white">
                Create
              </button>
            </div>
          </form>
          }
        </div>
      </div>
    </div>
  );
}

export default CreateOrederModal;
