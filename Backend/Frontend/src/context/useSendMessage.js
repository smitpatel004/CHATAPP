
import React, { useState } from "react";
import axios from "axios";
import userConversation from "../stateMange/useConversation.js";
import { useSocketContext } from "./SocketContext.jsx";


const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = userConversation();
  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );

      const newMessage = res.data;
      
      // Then send via socket
      if (socket && selectedConversation) {
        socket.emit("privateMessage", {
          senderId: newMessage.sender,
          receiverId: selectedConversation._id,
          message: newMessage
        });
      }
      
      // Optimistically update UI
      setMessages([...messages, newMessage]);

      // setMessages([...messages, res.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;