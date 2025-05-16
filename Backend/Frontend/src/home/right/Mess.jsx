
import React from "react";

export default function Mess({ sender }) {
  const authUser = JSON.parse(localStorage.getItem("token"));
  if (!authUser || !authUser.user) {
    console.error("User authentication data is missing.");
    return null;
  }

  const senderId = sender?.senderId || null;

  const authUserId = authUser.user._id;

  const itsme = senderId === authUserId;

  return (
    <div className={`flex ${itsme ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] p-3 rounded-lg ${
        itsme
          ? 'bg-blue-600 text-white rounded-tr-none'
          : 'bg-red-500 text-white rounded-tl-none'
      }`}>
        {sender.message}
      </div>
    </div>
  );
}
