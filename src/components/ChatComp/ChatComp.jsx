import React, { useState, useEffect, useRef } from "react";
import {
  db,
  auth,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
  getDocs,
  doc,
  orderBy,
} from "../../Firebase/firebase";
import { CiSearch } from "react-icons/ci";
import Video from "./Assets/video.png";
import chatimg from "./Assets/chatimg.jpg";
import receipt from "./Assets/receipt.png";
import sendmsg from "./Assets/sendmsg.png";
import msg from "./Assets/pngwing.com.png";
import { IoReorderThreeOutline, IoCloseOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { useMyContext } from "../../Context/Context";
import axiosInstance from "../../axiosInstance/axioisInstance";
import { SignJWT } from "jose";
import { Buffer } from "buffer";
import { FaRegSquarePlus } from "react-icons/fa6";
import CreateOrederModal from "./CreateOrderModal";
import { CiImageOn } from "react-icons/ci";

function ChatComp() {
  const [userType, setUserType] = useState("user");
  const [openChats, setOpenChats] = useState(false);
  const [openSend, setOpenSend] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { setOpenCreateOrder, adminID, chatId, setChatID,sendMessage, setSendMessage, openCreateOrder } = useMyContext();
  const [conversations, setConversations] = useState([]);
  const [firebaseToken, setFirebaseToken] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tokenAuth, setToken] = useState("");
  const [role, setRole] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredConversations, setFilteredConversations] = useState([]);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : {};
  });
  useEffect(() => {
    if (user !== null) {
      localStorage.setItem("userData", JSON.stringify(user));
    }
  }, [user]);
  const chatEndRef = useRef(null);
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("chatId", "==", chatId.toString()),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sortedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(sortedMessages);
    });

    return unsubscribe;
  }, [chatId.toString()]);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "conversations"), (snapshot) => {
      const conversationList = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => b.lastTimestamp - a.lastTimestamp); 
      
      setConversations(conversationList);
      setFilteredConversations(conversationList); 
    });
  
    return unsubscribe;
  }, []);
  
  const isImageLink = (text) => {
    // Check if the text is a valid image link
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    try {
      const url = new URL(text); // Validate as URL
      const extension = url.pathname.split(".").pop().toLowerCase();
      return imageExtensions.includes(extension);
    } catch {
      return false;
    }
  }
  
  const getUser = async (id) => {
    try {
      const response = await axiosInstance.get(`getUserById/${id}`);
      if (response.data) {
        console.log(response.data);
        setUser(response.data.user);
        setToken(response.data.user.device_token);
        setRole(response.data.user.role)
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    } finally {
    }
  };
  useEffect(() => {
    getUser(chatId);
  }, [chatId]);

  const handleSubmit = async (e) => {
    
   

    try {
      const response = await axiosInstance.post("sendNotification", {
        deviceToken: tokenAuth,
        title:"Message From Admin",
        body: newMessage,
        role:role
        
      });
      if (response.data) {
        console.log(response)
        
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        notify()
      } else {
        console.log(error);
      }
    } finally {
    
     
    }
  };



  


  






  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      alert("Please enter a message.");
      return;
    }
  
    try {
      // Add the new message to the "messages" collection
      await addDoc(collection(db, "messages"), {
        message: newMessage,
        timestamp: new Date().getTime(),
        user: "Admin", // Replace with actual user type
        senderID: "1", // Replace with actual sender ID
        receiverID: chatId.toString(),
        messageType: "text",
        chatId: chatId.toString(),
      });
  
      const conversationRef = collection(db, "conversations");
      const q = query(conversationRef, where("chatId", "==", chatId.toString()));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Conversation exists, update it
        querySnapshot.forEach(async (docSnap) => {
          const conversationDoc = doc(db, "conversations", docSnap.id);
          await updateDoc(conversationDoc, {
            lastMessage: newMessage,
            lastTimestamp: new Date().getTime(),
            seen: true,
            user_type: role, 
            profile: user.profile_pic, 
            name: user.name, 
          });
        });
      } else {
        // Conversation doesn't exist, create a new one
        await addDoc(conversationRef, {
          adminID: "1", 
          senderID: "1", 
          receiverID: chatId.toString(),
          chatId: chatId.toString(),
          lastMessage: newMessage,
          lastTimestamp: new Date().getTime(),
          seen: true,
          user_type: role, 
          profile: user.profile_pic, 
          name: user.name, 
        });
      }
  
      // Clear the message input after sending
      setNewMessage("");
      handleSubmit(); // Trigger notification sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSendOrderMessage=async(msg)=>{
    try{
      await addDoc(collection(db, "messages"), {
        message: msg,
        timestamp: new Date().getTime(),
        user: "Admin", // Replace with actual user type
        senderID: "1", // Replace with actual sender ID
        receiverID: chatId.toString(),
        messageType: "order",
        chatId: chatId.toString(),
      });

      const conversationRef = collection(db, "conversations");
      const q = query(conversationRef, where("chatId", "==", chatId.toString()));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Conversation exists, update it
        querySnapshot.forEach(async (docSnap) => {
          const conversationDoc = doc(db, "conversations", docSnap.id);
          await updateDoc(conversationDoc, {
            lastMessage: msg,
            lastTimestamp: new Date().getTime(),
            seen: true,
            user_type: role, 
            profile: user.profile_pic, 
            name: user.name, 
          });
        });
      } else {
        // Conversation doesn't exist, create a new one
        await addDoc(conversationRef, {
          adminID: "1", 
          senderID: "1", 
          receiverID: chatId.toString(),
          chatId: chatId.toString(),
          lastMessage: msg,
          lastTimestamp: new Date().getTime(),
          seen: true,
          user_type: role, 
          profilepic_url: user.profile_pic, 
          name: user.name, 
        });
      }

      handleSubmit();
    }catch(error){
      console.error("Error sending message:", error);

    }

  }
  

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  function convertMillisecondsToTime(milliseconds) {
    if (!milliseconds || isNaN(milliseconds)) {
      return "Invalid time";
    }

    const date = new Date(Number(milliseconds));
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  }


  const [users, setUsers] = useState([]);

  const getUserChat = async (id) => {
    try {
      const response = await axiosInstance.get(`getUserById/${id}`);
      if (response.data && response.data.user) {
        const { name, profile_pic } = response.data.user;
        return { name, profile_pic };
      }
      return null;
    } catch (error) {
      console.error(error.response || error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await Promise.all(
        conversations.map((data) => getUserChat(data.chatId))
      );
      setUsers(fetchedUsers.filter((user) => user !== null));
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = conversations.filter((conversation) =>
        conversation.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(conversations);
    }
  }, [searchQuery, conversations]);

  const handleConversationClick = async (conversation) => {
    try {
      const conversationDoc = doc(db, "conversations", conversation.id);
      await updateDoc(conversationDoc, {
        seen: true,
      });

      setChatID(conversation.chatId);
    } catch (error) {
      console.error("Error updating conversation seen status:", error);
    }
  };







  return (
    <>
          <div className={`${openCreateOrder === true ? "" : "hidden"}`}>
        <CreateOrederModal handleSendOrderMessage={handleSendOrderMessage}/>
      </div>

    <div className="w-full  h-[] bg-[#fafafa] overflow-hidden">
      <div className="chatModule-div relative lg:ml-[260px] px-3 top-[20px] flex">
        <div
          className={`absolute h-[88vh] lg:h-[86.8vh] 2xl:h-[93vh] bg-white top-0 transition-all duration-300 ${
            openChats ? "left-0 h-full" : "-left-[140%]"
          } lg:static lg:left-auto lg:w-1/4`}
        >
          <div
            onClick={() => setOpenChats(false)}
            className="lg:static w-full px-2 overflow-auto h-full lg:pb-0 pb-12 transition-all chat bg-[#fafafa] overflow-chat"
          >
            <div className="flex items-center justify-between">
              <IoCloseOutline
                className="text-[2rem] lg:hidden"
                onClick={() => setOpenChats(false)}
              />
            </div>

            <div className="btns bg-[#fff] lg:w-[95%] w-full lg:px-3 flex items-center justify-center gap-3 py-1 lg:py-1 px-1 rounded border text-[0.9rem] font-medium mt-3">
              <button
                onClick={() => setUserType("user")}
                className={`py-[0.6rem] ${
                  userType === "user"
                    ? "bg-[#003a5f] shadow-md text-white"
                    : "hover:bg-white hover:shadow-md"
                } w-[50%] px-7 rounded text-center`}
              >
                Client
              </button>
              <button
                onClick={() => setUserType("inspector")}
                className={`py-[0.6rem] ${
                  userType === "inspector"
                    ? "bg-[#003a5f] shadow-md text-white"
                    : "hover:bg-white hover:shadow-md"
                } w-[50%] px-5 rounded text-center`}
              >
                Technician
              </button>
            </div>
            <div className="search-box flex gap-3 my-2 lg:w-[95%] w-full">
                <input
                  type="text"
                  className="bg-transparent text-black border h-[45px] lg:w-[300px] md:w-[300px] w-[230px] rounded ps-3"
                  placeholder="Search chat by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={()=>setSendMessage(true)} className="h-[45px] w-[50px] bg-[#c90000] rounded flex justify-center items-center ">
                <FaRegSquarePlus className="text-white text-[1.4rem]" />
                </button>
              </div>

            <div className="">
            {filteredConversations?.filter((conversation) => conversation.user_type === userType).length > 0 ? (
  filteredConversations
    ?.filter((conversation) => conversation.user_type === userType)
    .map((conversation) => (
      <div
        onClick={() => handleConversationClick(conversation)}
        key={conversation.id}
        className="p-3 border-b cursor-pointer hover:bg-slate-200 transition-all flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <img
            src={conversation.profile}
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">{conversation.name}</h2>
            {/* Check if lastMessage is an image link */}
            {isImageLink(conversation.lastMessage) ? (
              <p className="text-md text-gray-600 flex items-center gap-0.5"><CiImageOn/> Image</p>
            ) : (
              <p
                className={`text-sm ${
                  conversation.seen === true
                    ? "text-gray-600"
                    : "text-[#c90000]"
                }`}
              >
                {conversation.lastMessage?.length > 30
                  ? `${conversation.lastMessage.slice(0, 30)}...`
                  : conversation.lastMessage}
              </p>
            )}
            <p className="text-xs text-gray-400">
              {convertMillisecondsToTime(conversation.lastTimestamp)}
            </p>
          </div>
        </div>
        <div
          className={`${
            conversation.seen === true ? "hidden" : "block"
          }`}
        >
          <FaCircle className="text-[0.8rem] text-[#c90000]" />
        </div>
      </div>
    ))
) : (
  <p className="mt-4">No Conversation Started Yet!</p>
)}
 </div>
          </div>
        </div>

        {chatId ? (
          <div className="w-full lg:w-3/4 h-[88vh] lg:h-[86.8vh] 2xl:h-[90vh] rounded border bg-[#fefefe]">
            <div className="px-2 py-3 border-b-2 border-dashed flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IoReorderThreeOutline
                  onClick={() => setOpenChats(true)}
                  className="text-[2rem] lg:hidden"
                />
                <img
                  src={user.profile_pic}
                  alt=""
                  className="w-[3.5rem] h-[3.5rem] rounded-full object-cover"
                />
                <div className="leading-none">
                  <h1 className="text-[1.4rem] font-medium">{user.name}</h1>
                  {/* <p className="text-sm text-[#799aad]">Active now</p> */}
                </div>
              </div>
              <div
                onClick={() => setOpenCreateOrder(true)}
                className={`bg-[#c90000] cursor-pointer p-2 font-medium text-white rounded ${role==='user'?"block":"hidden"}`}
              >
                Create Order
              </div>
            </div>

            <div className="overflow-auto chat w-full h-[75%] 2xl:h-[78%] overflow-chat p-3">
              {messages.map((msg) => {
                const messageTime = convertMillisecondsToTime(msg.timestamp);

                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.user === "Admin" ? "justify-end" : "justify-start"
                    } gap-2 py-2`}
                  >
                    <div
                      className={`p-2 text-sm shadow-lg  rounded-t-2xl ${
                        msg.user === "Admin"
                          ? "bg-[#d1e7ff] text-black rounded-bl-2xl"
                          : "bg-[#ffc7c7] text-black rounded-br-2xl"
                      }`}
                    >
                      {msg.messageType === "text" ? (
                        <p className="text-[1.1rem]">{msg.message}</p>
                      ) : msg.messageType === "picture" ? (
                        <a href={msg.message} target="_blank">
                          <img
                            src={msg.message}
                            alt="Message"
                            className="max-w-[300px] max-h-[200px] rounded object-cover"
                          />
                        </a>
                      ) :  msg.messageType === "order" ? (
                       <div><p className="w-full text-center bg-[#003a5f] text-white py-1 text-[1.1rem] mb-2 rounded-md">Booking Report</p>
                        <p className="text-[1.1rem]">{msg.message}</p></div>):null}

                      <p className="text-[10px] mt-1 text-[#707070] text-right">
                        {messageTime}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            <div className=" px-2">
              <div className="sendmessage p-3 flex items-center justify-center w-full  bg-[#fafafa] text-black  border-2  rounded-full px-3">
                <input
                  type="text"
                  placeholder="Type Message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-black w-full h-full border-none outline-none bg-transparent"
                />
                <img
                  src={sendmsg}
                  alt=""
                  className="w-[2rem] border-l-2 pl-1  cursor-pointer"
                  onClick={handleSendMessage}
                />
              </div>
            </div>
          </div>
        ): (
          <div className="flex flex-col items-center justify-center w-full lg:w-3/4 h-[88vh] border">
            <img src={msg} alt="" className="w-[15rem]" />
            <p className="text-[2rem]">Select Chat to Start Conversation!</p>
          </div>
        ) }
      </div>
    </div></>
  );
}

export default ChatComp;
