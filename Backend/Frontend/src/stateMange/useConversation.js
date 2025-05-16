

import { create } from 'zustand';

const userConversation = create((set, get) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => {
    console.log("🔄 Updating selectedConversation:", selectedConversation);
    set({ selectedConversation });
  },
  messages: [],
  setMessages: (newMessages) => {
    // Replace entire message array
    set({ messages: Array.isArray(newMessages) ? newMessages : [] });
  },
  addMessage: (newMessage) => {
    const { messages } = get();
    const alreadyExists = messages.some((msg) => msg._id === newMessage._id);
    if (!alreadyExists) {
      set({ messages: [...messages, newMessage] });
    }
  },
}));

export default userConversation;



