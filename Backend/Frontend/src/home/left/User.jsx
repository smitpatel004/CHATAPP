
import React, { useEffect } from "react";
import UserGetAlluser from "../../context/UserGetAlluser";
import userConversation from "../../stateMange/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
// import { useSocketContext } from "../../context/SocketProvider"; // Import the socket context
// useSocketContext
export default function UserList() {
  const [alluser, loading] = UserGetAlluser();
  const { selectedConversation, setSelectedConversation } = userConversation();
  const { onlineUsers } = useSocketContext(); // Access onlineUsers from socket context

  useEffect(() => {
    console.log("selectConversation changed:", selectedConversation);
  }, [selectedConversation]);

  const isOnline = (userId) => onlineUsers.some((user) => user._id === userId);

  if (loading) return <p className="text-white text-center">Loading...</p>;

  return (
    <div style={{ maxHeight: "84vh", overflowY: "auto" }}>
      {alluser.map((usr) => (
        <div
          key={usr._id}
          className={`flex items-center space-x-4 px-6 py-3 cursor-pointer border-b border-slate-700
            hover:bg-slate-600 duration-300 ${
              selectedConversation?._id === usr._id ? "bg-slate-700" : ""
            }`}
          onClick={() => setSelectedConversation(usr)}
        >
          <div className="avatar online">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={"https://img1.picmix.com/output/stamp/normal/7/5/3/7/2147357_21bc7.png" || "/default-avatar.png"} alt={usr.name} />
            </div>
          </div>
          <div className="text-white">
            <p className="font-semibold">{usr.name}</p>
            <p className="text-sm text-gray-400">{usr.email}</p>
           
          </div>
        </div>
      ))}
    </div>
  );
}


