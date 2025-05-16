

import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage";

export default function Type() {
  const {loading,sendMessages}= useSendMessage();
  const [message, setMessage] = useState("");
  
  const handleSubmit = async(e) => {
    e.preventDefault();
   
    await sendMessages(message);
    setMessage("")
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-3 bg-slate-700">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="w-full px-4 py-2 rounded-l-lg focus:outline-none bg-slate-600 text-white placeholder-slate-400"
      />
      <button 
        type="submit" 
        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-lg transition-colors duration-200"
      >
        <IoSend className="text-xl" />
      </button>
    </form>
  );
}


