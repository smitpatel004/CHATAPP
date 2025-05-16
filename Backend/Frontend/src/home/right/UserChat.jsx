
import React from "react";
import userConversation from "../../stateMange/useConversation.js";

export default function UserChat() {
  const { selectedConversation } = userConversation();
  console.log("selesssssssssss",selectedConversation)
  // const users = selectedConversation || []; // Ensure it's always an array
try {
  return (
    <div className=" pl-5 pt-5 h-[12vh] flex space-x-4 bg-gray-700 hover:bg-gray-600 duration-300">
      <div>
        <div className="avatar online">
          <div className="w-14 rounded-full">
            {/* <img src="" alt="" /> */}
            <img src="" alt="nsme" />
           

           
           
           
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl">{selectedConversation.name}</h1>
        <span className="text-sm">
          {/* {getOnlineUsersStatus(selectedConversation._id)} */}
        </span>
      </div>
    </div>
  );
} catch (error) {
  console.log("ERROR IN USERCHAT")
}
  
}

