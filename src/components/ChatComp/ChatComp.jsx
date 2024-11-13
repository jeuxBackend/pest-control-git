import React, { useState, useEffect, useRef } from "react";
import { db, auth, collection, addDoc, onSnapshot, updateDoc, query, where, getDocs, doc, orderBy } from "../../Firebase/firebase";
import { CiSearch } from "react-icons/ci";
import Video from "./Assets/video.png";
import chatimg from "./Assets/chatimg.jpg";
import receipt from "./Assets/receipt.png";
import sendmsg from "./Assets/sendmsg.png";
import { IoReorderThreeOutline, IoCloseOutline } from "react-icons/io5";
import { useMyContext } from "../../Context/Context";

function ChatComp() {
  const [chat, setChat] = useState("chat")
  const [openChats, setOpenChats] = useState(false);
  const [openSend, setOpenSend] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { setOpenCreateOrder, adminID } = useMyContext();
  const [conversations, setConversations] = useState([]);
  const chatEndRef = useRef(null);
  useEffect(() => {
    const receiverID = "2";


    const q = query(
      collection(db, "messages"),
      where("receiverID", "==", receiverID),
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
  }, []);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {

    const unsubscribe = onSnapshot(collection(db, "conversations"), (snapshot) => {
      setConversations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);



  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      alert("Please enter a message.");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        message: newMessage,
        timestamp: new Date(),
        user: "Admin",
        senderID: '1',
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
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };



  return (
    <div className="w-full  h-[] bg-[#fafafa] overflow-hidden">
      <div className="chatModule-div relative lg:ml-[260px] px-3 top-[20px] flex">
        <div
          className={`absolute h-[88vh] lg:h-[86.8vh] bg-white top-0 transition-all duration-300 ${openChats ? "left-0 h-full" : "-left-[140%]"
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
                className={`py-[0.6rem] ${chat === "chat" ? "bg-[#003a5f] shadow-md text-white" : "hover:bg-white hover:shadow-md"
                  } w-[50%] px-7 rounded text-center`}
              >
                Client
              </button>
              <button
                onClick={() => setChat("casechat")}
                className={`py-[0.6rem] ${chat === "casechat" ? "bg-[#003a5f] shadow-md text-white" : "hover:bg-white hover:shadow-md"
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
          <div className="overflow-auto chat w-full h-[75%] overflow-chat p-3">
            {messages.map((msg) => {
              const messageTime = msg.timestamp?.toDate().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={msg.id}
                  className={`flex ${msg.user === 'Admin' ? "justify-end" : "justify-start"
                    } gap-2 py-2`}
                >
                  <div
                    className={`p-2 text-sm shadow-lg rounded-t-2xl ${msg.user === 'Admin'
                      ? "bg-[#d1e7ff] text-black rounded-bl-2xl"
                      : "bg-[#ffc7c7] text-black rounded-br-2xl"
                      }`}
                  >
                    <p className="text-[1.1rem]">{msg.message}</p>
                    <p className="text-[10px] mt-1 text-[#707070] text-right">{messageTime}</p>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>


          {/* Message Input */}
          <div className=" px-2">
            <div className="sendmessage p-3 flex items-center justify-center w-full  bg-[#fafafa] text-black  border-2  rounded-full px-3">
              <input
                type="text"
                placeholder="Type Message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress} 
                className="text-black w-full h-full border-none outline-none"
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
      </div>
    </div>
  );
}

export default ChatComp;
