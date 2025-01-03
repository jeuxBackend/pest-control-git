import React, { useState } from "react";
import { Oval, TailSpin } from "react-loader-spinner";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";
import toast from "react-hot-toast";

function AddInspectorModal() {
  const { openAddInspector, setOpenAddInspector, setToaster } = useMyContext();
  const [profile, setProfile] = useState();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseDate, setLicenseDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagevoucher, setImageVoucher] = useState(null);

  const notifyError = (e) => toast.error(e);

  const handleImageChangeVoucher = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageVoucher(reader.result);
        setProfile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileDialogVoucher = () => {
    document.getElementById("fileInputVoucher").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    if (!imagevoucher) {
      alert("Please upload an image.");
      return;
    } else {
      try {
        setIsLoading(true);
        const response = await axiosInstance.post("admin/add-inspector", {
          name: name,
          user_name: userName,
          email: email,
          number: phone,
          password: password,
          profile_pic: profile,
          license_date: licenseDate,
          expire_date: expireDate,
        });
        if (response.data) {
          setToaster(1);
          console.log(response.data);
          setOpenAddInspector(false);
          setName("");
          setUserName("");
          setEmail("");
          setPassword("");
          setPhone("");
          setLicenseDate("");
          setExpireDate("");
          setImageVoucher(null);
          setProfile(null);
        }
      } catch (error) {
        if (error.response) {
          // setToaster(2);
          notifyError(error?.response?.data?.errors);
          console.log(error.response);
        
        } else {
          console.log(error);
          notifyError("Network error");
        }
      } finally {
        setIsLoading(false);
    
      }
    }
  };

  return (
    <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins">
      <div className="flex items-center justify-center py-10 w-full min-h-screen ">
        <div className="bg-[#ffff] rounded-xl w-[0%]\ sm:w-[40rem] pt-3 px-3 flex flex-col items-center justify-center gap-2">
          <h1 className="xs:text-[1.5rem] text-[1.2rem] sm:text-[2rem] mb-[-22px] font-medium">
            Add Technician
          </h1>
          {isLoading ? (
            <div className="flex items-center justify-center h-[40vh] w-[60%] sm:w-[35%] md:w-[40%] py-3 rounded  bg-[#white] text-white">
              <TailSpin
                height={50}
                width={50}
                color="#0066a5"
                ariaLabel="loading"
              />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full p-6 flex flex-col gap-3"
            >
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-32 h-32 sm:w-40 sm:h-40  rounded-lg cursor-pointer">
                  {imagevoucher ? (
                    <div
                      className="relative w-full h-full cursor-pointer"
                      onClick={openFileDialogVoucher}
                    >
                      <img
                        src={imagevoucher}
                        alt="uploaded"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-center w-full h-full text-gray-500 border rounded-full"
                      onClick={openFileDialogVoucher}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-14 h-14 text-[#d4d4d4] rounded-full"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangeVoucher}
                    className="hidden"
                    id="fileInputVoucher"
                  
                  />
                </div>
              </div>
              <div className=" w-[100%]">
                <p className="mb-1 font-medium">User Name</p>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="User Name"
                  className="w-full py-3 px-4 rounded-xl border shadow-sm"
                  required
                />
              </div>
              <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
                <div className="lg:w-[50%] w-[100%]">
                  <p className="mb-1 font-medium">Full Name</p>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full py-3 px-4 rounded-xl border shadow-sm"
                    required
                  />
                </div>
                <div className="lg:w-[50%] w-[100%]">
                  <p className="mb-1 font-medium">Email Address</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email Address"
                    className="w-full py-3 px-4 rounded-xl border shadow-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
                <div className="lg:w-[50%] w-[100%]">
                  <p className="mb-1 font-medium">Password</p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    placeholder="Password"
                    className="w-full py-3 px-4 rounded-xl border shadow-sm"
                    required
                  />
                </div>
                <div className="lg:w-[50%] w-[100%]">
                  <p className="mb-1 font-medium">Phone Number</p>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full py-3 px-4 rounded-xl border shadow-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 lg:gap-8 lg:flex-row flex-col">
                <div className="lg:w-[50%] w-[100%]">
                  <p className="mb-1 font-medium">License Date</p>
                  <input
                    max={new Date().toISOString().split("T")[0]}
                    value={licenseDate}
                    onChange={(e) => setLicenseDate(e.target.value)}
                    type="date"
                    placeholder="License Date"
                    className="w-full py-3 px-4 rounded-xl border shadow-sm"
                    required
                  />
                </div>
                <div className="lg:w-[50%] w-[100%]">
                  <p className="mb-1 font-medium">Expire Date</p>
                  <input
                    value={expireDate}
                    min={new Date().toISOString().split("T")[0]} 
                    onChange={(e) => setExpireDate(e.target.value)}
                    type="date"
                    placeholder="License Expire Date"
                    className="w-full py-3 px-4 rounded-xl border shadow-sm"
                    required
                  />
                </div>
              </div>
              <div className="font-medium flex items-center justify-center lg:gap-x-8 gap-3 mt-3">
                <button
                  type="reset"
                  onClick={() => setOpenAddInspector(false)}
                  className="w-[60%] sm:w-[35%] md:w-[40%] border shadow-sm py-3 rounded bg-white font-semibold text-black"
                >
                  Cancel
                </button>
                <button className="w-[60%] sm:w-[35%] md:w-[40%] py-3 rounded shadow-sm font-semibold bg-[#c90000] text-white">
                  Add
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddInspectorModal;
