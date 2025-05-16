
import { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import userConversation from "../stateMange/useConversation";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = userConversation();

  useEffect(() => {
    if (!socket || !selectedConversation) return;

const handleNewMessage = (newMessage) => {
  const { selectedConversation, addMessage } = userConversation.getState();
  if (!selectedConversation) return;

  const isRelevant =
    newMessage.senderId === selectedConversation._id ||
    newMessage.receiverId === selectedConversation._id;

  if (isRelevant) {
    addMessage(newMessage);
    console.log("✅ New message added to chat:", newMessage);
  } else {
    console.log("📭 Message not for current chat:", newMessage);
  }
};



    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages, selectedConversation]);
};

export default useGetSocketMessage;
