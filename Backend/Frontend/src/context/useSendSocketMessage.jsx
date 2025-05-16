import { useSocketContext } from "./SocketContext";
import userConversation from "../stateMange/useConversation.js";

const useSendSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = userConversation();

  const sendMessage = (messageText, senderId) => {
    if (!socket || !messageText.trim()) return;

    const newMessage = {
      text: messageText,
      senderId: senderId || authUser.user._id ,
       receiverId: receiverId, 
      timestamp: new Date().toISOString(),
      // Add any other necessary fields
    };

    // Emit the message to the server
    socket.emit("sendMessage", newMessage);
    
    // Optimistically update the UI
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // setMessages((prevMessages) => [...prevMessages, newMessage]);

  };

  return { sendMessage };
};

export default useSendSocketMessage;