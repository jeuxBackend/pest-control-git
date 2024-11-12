import React, { useState, useEffect } from "react";
import { db, auth, collection, addDoc, onSnapshot, updateDoc, query,where, getDocs, doc  } from "../../Firebase/firebase";
import { CiSearch } from "react-icons/ci";
import Video from "./Assets/video.png";
import chatimg from "./Assets/chatimg.jpg";
import receipt from "./Assets/receipt.png";
import sendmsg from "./Assets/sendmsg.png";
import { IoReorderThreeOutline, IoCloseOutline } from "react-icons/io5";
import { useMyContext } from "../../Context/Context";

function ChatComp() {
  const [chat, setChat] = useState("chat");
  const [openChats, setOpenChats] = useState(false);
  const [openSend, setOpenSend] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { setOpenCreateOrder, adminID } = useMyContext();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    
    const unsubscribe = onSnapshot(collection(db, "conversations"), (snapshot) => {
      setConversations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
      
        await addDoc(collection(db, "messages"), {
          text: newMessage,
          timestamp: new Date(),
          user: auth.currentUser ? auth.currentUser.displayName : "Guest",
          adminID: adminID,
          receiverID: "2",
        });
  
        
        const conversationRef = collection(db, "conversations");
        
      
        const q = query(conversationRef, where("receiverID", "==", "2"));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          
          querySnapshot.forEach(async (docSnap) => {
            const conversationDoc = doc(db, "conversations", docSnap.id);
            await updateDoc(conversationDoc, {
              lastMessage: newMessage,
              lastTimestamp: new Date(),
            });
          });
        } else {
          
          await addDoc(conversationRef, {
            adminID: adminID,
            receiverID: "2",
            lastMessage: newMessage,
            lastTimestamp: new Date(),
          });
        }
  
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };



  return (
    <div className="w-full h-full min-h-screen bg-[#fafafa]">
       <div className="chatModule-div relative lg:ml-[260px] px-3 top-[20px] flex">
        <div
          className={`absolute h-[88vh] lg:h-[86.8vh] bg-white top-0 transition-all duration-300 ${
            openChats ? "left-0 h-full" : "-left-[140%]"
          } lg:static lg:left-auto lg:w-1/4`}
        >
          {/* Sidebar and Contact List */}
          <div onClick={() => setOpenChats(false)} className="lg:static w-full px-2 overflow-auto h-full lg:pb-0 pb-12 transition-all chat bg-[#fafafa] overflow-chat">
            <div className="flex items-center justify-between">
              <IoCloseOutline className="text-[2rem] lg:hidden" onClick={() => setOpenChats(false)} />
            </div>
            {/* Chat Buttons */}
            <div className="btns bg-[#fff] lg:w-[90%] w-full lg:px-3 flex items-center justify-center gap-3 py-1 lg:py-1 px-1 rounded border text-[0.9rem] font-medium">
              <button
                onClick={() => setChat("chat")}
                className={`py-[0.6rem] ${
                  chat === "chat" ? "bg-[#003a5f] shadow-md text-white" : "hover:bg-white hover:shadow-md"
                } w-[50%] px-7 rounded text-center`}
              >
                Client
              </button>
              <button
                onClick={() => setChat("casechat")}
                className={`py-[0.6rem] ${
                  chat === "casechat" ? "bg-[#003a5f] shadow-md text-white" : "hover:bg-white hover:shadow-md"
                } w-[50%] px-5 rounded text-center`}
              >
                Inspector
              </button>
            </div>
            <div>
              {/* Display Conversations */}
              {conversations.map((conversation) => (
                <div key={conversation.id} className="p-3 border-b">
                  <h2 className="text-lg font-semibold">Receiver ID: {conversation.receiverID}</h2>
                  <p className="text-sm text-gray-600">Last Message: {conversation.lastMessage}</p>
                  <p className="text-xs text-gray-400">{conversation.lastTimestamp?.toDate().toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-full lg:w-3/4 h-[88vh] rounded border bg-[#fefefe]">
          <div className="px-2 py-3 border-b-2 border-dashed flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IoReorderThreeOutline onClick={() => setOpenChats(true)} className="text-[2rem] lg:hidden" />
              <img src={chatimg} alt="" className="w-[3.5rem] h-[3.5rem] rounded-full object-cover" />
              <div className="leading-none">
                <h1 className="text-[1.4rem] font-medium">Albert Flores</h1>
                <p className="text-sm text-[#799aad]">Active now</p>
              </div>
            </div>
          </div>

          {/* Messages Display */}
          <div className="overflow-auto chat w-full h-[70%] overflow-chat p-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.user === "Guest" ? "items-start" : "items-end"} gap-2 py-2`}>
                <p className="text-[1.1rem] p-2 bg-[#ffc7c7] text-sm inline-block rounded-t-2xl shadow-lg rounded-br-2xl">
                  {msg.text}
                </p>
                <p className="text-[10px] mt-1 text-[#b2b2b2]">{msg.user}</p>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="sendmessage p-3 flex items-end justify-center w-full h-[18%]">
            <input
              type="text"
              placeholder="Type Message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-[#fafafa] text-black w-full border-2 py-3 rounded-full px-3"
            />
            <img
              src={sendmsg}
              alt=""
              className="w-[2.5rem] border-l-2 pl-1  cursor-pointer"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComp;
