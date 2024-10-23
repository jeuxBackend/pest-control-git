import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Video from "./Assets/video.png";
import chatimg from "./Assets/chatimg.jpg";
import chatimg2 from "./Assets/chatimg2.png";
import chatimg3 from "./Assets/chatimg3.png";
import chatimg4 from "./Assets/chatimg4.png";
import chatimg5 from "./Assets/chatimg5.png";
import receipt from "./Assets/receipt.png";
import send from "./Assets/sendmedia.png";
import Search from "./Assets/search-icon.png";
import sendmsg from "./Assets/sendmsg.png";
import Doc from "./Assets/doc.png";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useMyContext } from "../../Context/Context";
import pdf from "./Assets/pdf.png";
import img from "./Assets/img.png";

function ChatComp() {
  const [chat, setChat] = useState("chat");
  const [openChats, setOpenChats] = useState(false);
  const [openSend, setOpenSend] = useState(false);
  const { setOpenOfferModal } = useMyContext();

  return (
    <div className="w-full h-full min-h-screen bg-[#fafafa]">
      <div className="chatModule-div relative  lg:ml-[260px] px-3 top-[20px] flex">
        <div
          className={`absolute h-[88vh] lg:h-[86.8vh] bg-white top-0  transition-all duration-300 ${
            openChats ? "left-0 h-full" : "-left-[140%]"
          } lg:static lg:left-auto lg:w-1/4`}
        >
          {/* contacts area */}
          <div
            onClick={() => setOpenSend(false)}
            className={`lg:static w-full  px-2 overflow-auto h-full  transition-all chat bg-[#fafafa] overflow-chat`}
          >
            <div
              onClick={() => setOpenSend(false)}
              className="flex items-center justify-between"
            >
              <IoCloseOutline
                className="text-[2rem] lg:hidden"
                onClick={() => setOpenChats(false)}
              />
            </div>
            <div className="w-full flex justify-center flex-col 3xl:mt-[4rem]">
              <div className="btns bg-[#fff] lg:w-[90%] w-full lg:px-3 flex items-center justify-center gap-3 py-1 lg:py-1 px-1 rounded border text-[0.9rem] font-medium">
                <button
                  to="/Lawyer-Login"
                  onClick={() => setChat("chat")}
                  className={`py-[0.6rem] ${
                    chat === "chat"
                      ? "bg-[#003a5f] shadow-md text-white"
                      : "hover:bg-white hover:shadow-md"
                  } w-[50%] px-7 text-nowrap  rounded text-center h-full`}
                >
                  Client
                </button>
                <button
                  to="/Lawyer-SignUp"
                  onClick={() => setChat("casechat")}
                  className={`py-[0.6rem] ${
                    chat === "casechat"
                      ? "bg-[#003a5f] shadow-md text-white "
                      : "hover:bg-white hover:shadow-md"
                  }  text-center w-[50%] px-5  rounded`}
                >
                  Inspector
                </button>
              </div>
            </div>
            <div className="py-2">
              <div className="relative w-full mt-2">
                {/* <CiSearch  /> */}
                <button className="h-[30px] w-[30px] bg-[#c90000] rounded flex justify-center items-center absolute end-[6px] top-[6px]">
                  <img src={Search} className="w-[15px]" alt="" />
                </button>
                <input
                  type="text"
                  placeholder="Search Here..."
                  className="w-full border bg-[#F6F6F6] gap-1 px-2 py-2 rounded"
                />
              </div>
            </div>
            <div className="py-2">
              <div className="flex flex-col gap-3">
                <div className="chatcard flex items-center gap-2 pt-2 pb-4 border-b-2 border-dashed border-[#799aad73]">
                  <img
                    src={chatimg}
                    alt=""
                    className="w-[3.5rem] h-[3.5rem] rounded-full object-cover"
                  />
                  <div>
                    <h1 className="text-lg font-bold text-[#003a5f]">
                      Alber Flores
                    </h1>
                    <p className="text-[#799aad] text-sm leading-none">
                      Donec sed erat ut magna suscipit mattis. Aliquam era{" "}
                    </p>
                  </div>
                </div>
                <div className="chatcard flex items-center gap-2 pt-2 pb-4 border-b-2 border-dashed border-[#799aad73]">
                  <img
                    src={chatimg2}
                    alt=""
                    className="w-[3.5rem] h-[3.5rem] rounded-full object-cover"
                  />
                  <div>
                    <h1 className="text-lg font-bold text-[#003a5f]">
                      Ralph Edwards
                    </h1>
                    <p className="text-[#799aad] text-sm leading-none">
                      Donec sed erat ut magna suscipit mattis. Aliquam erat..{" "}
                    </p>
                  </div>
                </div>
                <div className="chatcard flex items-center gap-2 pt-2 pb-4 border-b-2 border-dashed border-[#799aad73]">
                  <img
                    src={chatimg3}
                    alt=""
                    className="w-[3.5rem] h-[3.5rem] rounded-full object-cover"
                  />
                  <div>
                    <h1 className="text-lg font-bold text-[#003a5f]">
                      Kathryn Murphy
                    </h1>
                    <p className="text-[#799aad] text-sm leading-none">
                      Donec sed erat ut magna suscipit mattis. Aliquam erat..
                    </p>
                  </div>
                </div>
                <div className="chatcard flex items-center gap-2 pt-2 pb-4 border-b-2 border-dashed border-[#799aad73]">
                  <img
                    src={chatimg4}
                    alt=""
                    className="w-[3.5rem] h-[3.5rem] rounded-full object-cover"
                  />
                  <div>
                    <h1 className="text-lg font-bold text-[#003a5f]">
                      Jacob Jones
                    </h1>
                    <p className="text-[#799aad] text-sm leading-none">
                      Vestibulum eu quam nec neque pellentesque efficitur ...
                    </p>
                  </div>
                </div>
                <div className="chatcard flex items-center gap-2 pt-2 pb-4">
                  <img
                    src={chatimg5}
                    alt=""
                    className="w-[3.5rem] h-[3.5rem] rounded-full object-cover"
                  />
                  <div>
                    <h1 className="text-lg font-bold text-[#003a5f]">
                      Courtney Henry
                    </h1>
                    <p className="text-[#799aad] text-sm leading-none">
                      Donec sed erat ut magna suscipit mattis. Aliquam erat...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* chat part */}
        <div className="w-full lg:w-3/4 h-[88vh] rounded border bg-[#fefefe]">
          <div
            onClick={() => setOpenSend(false)}
            className="px-2 py-3 border-b-2 border-dashed flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <IoReorderThreeOutline
                onClick={() => setOpenChats(true)}
                className="text-[2rem] lg:hidden"
              />
              <img
                src={chatimg}
                alt=""
                className="w-[3.5rem] h-[3.5rem] rounded-full object-cover"
              />
              <div className="leading-none">
                <h1 className="text-[1.4rem] font-medium">Albert Flores</h1>
                <p className="text-sm text-[#799aad]">Active now</p>
              </div>
            </div>
            <div>
              <div
                onClick={() => setOpenOfferModal(true)}
                to="/Lawyer-CaseNotes"
                className="py-2 lg:px-5 px-2 text-center font-medium bg-[#c90000] rounded text-white text-[0.6rem] sm:text-[0.8rem] cursor-pointer"
              >
                Create Order
              </div>
            </div>
          </div>
          <div
            onClick={() => setOpenSend(false)}
            className="overflow-auto chat w-full h-[70%] overflow-chat"
          >
            <div className="messages-recieved p-3 flex flex-col items-start gap-3">
              <div className="recieved ">
                <p className="text-[1.1rem] p-2 bg-[#ffc7c7] text-sm inline-block rounded-t-2xl shadow-lg rounded-br-2xl">
                  Hey, How's It Going?
                </p>
                <p className="text-[10px] mt-1 text-[#b2b2b2]">7:12 Min</p>
              </div>
              <div className="recieved">
                <img src={Doc} alt="" className="h-[100px] w-[100px]" />
              </div>
            </div>
            <div className="messages-sent p-3 flex flex-col items-end gap-3 ">
              <div className="sent w-[270px]">
                <div className="bg-[#eef3ff] inline-block rounded-t-2xl shadow-lg rounded-bl-2xl">
                  <p className="p-2 bg-[#003a5f] text-white text-center rounded-tl-2xl rounded-tr-2xl">
                    Booking Request
                  </p>
                  <p className="p-2 text-[#3c3e41dc]">
                    Well, I Got A promotion At Work! Finally, Some Good News
                  </p>
                  <p className="p-2 text-[#3c3e41dc]">
                    05/25/2024 To 06/05/2024
                  </p>
                </div>
                <p className="text-[10px] mt-1 text-[#c1c6cf]">7:14 Min</p>
              </div>
            </div>
            <div className="messages-recieved p-3 flex flex-col items-start gap-3">
              <div className="mediarecieved">
                <div className="flex gap-2 flex-wrap">
                  <img
                    src={receipt}
                    alt=""
                    className="w-[100px] h-[100px] shadow-lg"
                  />
                  <img
                    src={Video}
                    alt=""
                    className="w-[100px] h-[100px] shadow-lg"
                  />
                </div>
              </div>
            </div>
            <div className="messages-sent p-3 flex flex-col items-end gap-3 ">
              <div className="sent">
                <p className="text-[1.1rem] p-2  bg-[#ecf3ff] inline-block rounded-t-2xl shadow-lg rounded-bl-2xl text-[#3c3e41dc]">
                  Not Too Bad, Just Trying To Survive This Week. You?
                </p>
                <p className="p-2 text-[#c1c6cf]">7:24 Min</p>
              </div>
            </div>
          </div>
          <div className="sendmessage p-3  flex items-end justify-center w-full h-[18%]">
            <div></div>
            <div className="w-full lg:mb-3 mb-5 relative">
              {/* <div
                className={`flex flex-col items-center gap-2 absolute bg-[#f6f0e4] p-4 rounded-t-2xl rounded-br-2xl shadow-lg -top-16 left-8 ${
                  openSend ? "" : "hidden"
                }`}
              >
                <div className="flex items-center gap-1">
                  <img src={img} alt="" className="w-[1.4rem]" />
                  <p>Gallery</p>
                </div>
                <div className="flex items-center gap-1">
                  <img src={pdf} alt="" className="w-[1.4rem]" />
                  <p>Document</p>
                </div>
              </div> */}

              {/* <img
                onClick={() => setOpenSend(!openSend)}
                src={send}
                alt=""
                className="w-[2rem] cursor-pointer"
              /> */}
              <input
                type="text"
                name=""
                id=""
                placeholder="Type Message..."
                className="bg-[#fafafa] text-black w-full border-2 py-3 rounded-full px-3"
                onClick={() => setOpenSend(false)}
              />
              <img
                src={sendmsg}
                alt=""
                className="w-[2.5rem] border-l-2 pl-1 absolute end-[10px] top-[10px]"
                onClick={() => setOpenSend(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComp;
