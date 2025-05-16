
// import React from "react";
// import userConversation from "../../stateMange/useConversation.js";

// export default function UserChat() {
//   const { selectedConversation } = userConversation();
//   console.log("selesssssssssss",selectedConversation)
//   // const users = selectedConversation || []; // Ensure it's always an array
// try {
//   return (
//     <div className=" pl-5 pt-5 h-[12vh] flex space-x-4 bg-gray-700 hover:bg-gray-600 duration-300">
//       <div>
//         <div className="avatar online">
//           <div className="w-14 rounded-full">
//             {/* <img src="" alt="" /> */}
//             <img src="https://img1.picmix.com/output/stamp/normal/7/5/3/7/2147357_21bc7.png" alt="" />
           

           
           
           
//           </div>
//         </div>
//       </div>
//       <div>
//         <h1 className="text-xl">{selectedConversation.name}</h1>
//         <span className="text-sm">
//           {/* {getOnlineUsersStatus(selectedConversation._id)} */}
//         </span>
//       </div>
//     </div>
//   );
// } catch (error) {
//   console.log("ERROR IN USERCHAT")
// }
  
// }

import React from "react";
import userConversation from "../../stateMange/useConversation.js";

export default function UserChat() {
  const { selectedConversation } = userConversation();
  console.log("Selected Conversation:", selectedConversation);

  if (!selectedConversation) return null; // prevent render if not selected

  return (
    <div className="pl-5 pt-4 h-[12vh] flex items-center space-x-4 bg-gray-700 hover:bg-gray-600 duration-300 rounded-md shadow-sm">
      {/* Avatar */}
      <div className="avatar online">
        <div className="w-14 h-14 rounded-full overflow-hidden transition-transform duration-300 hover:scale-105">
          <img
            src="https://img1.picmix.com/output/stamp/normal/7/5/3/7/2147357_21bc7.png"
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Name & Status */}
      <div className="flex flex-col justify-center">
        <h1 className="text-lg font-semibold text-white leading-tight">
          {selectedConversation.name}
        </h1>
        <span className="text-sm text-slate-300">
          {/* Placeholder for status or message */}
          {/* {getOnlineUsersStatus(selectedConversation._id)} */}
          Active now
        </span>
      </div>
    </div>
  );
}
