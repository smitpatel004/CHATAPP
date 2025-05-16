import React,{useEffect, useState} from "react";
import axios from 'axios'
import userConversation from "../stateMange/useConversation";
function useGetMessage(){
    const [loading,setLoading]=useState(false);
    const {messages,setMessages,selectedConversation}=userConversation();
    useEffect(()=>{
        const getMessages =  async()=>{
           console.log("IN GETMESSAGES")
          if(selectedConversation && selectedConversation._id){
            console.log("Fetching messages for:", selectedConversation._id);
            setLoading(true);
            try {
                const response =await axios.get(
                    `/api/message/get/${selectedConversation._id}`
                );
                console.log("API Response:", response.data);
                setMessages(response.data);
                // setMessages(Array.isArray(response.data) ? response.data : []); 
                setLoading(false);
            } catch (error) {
                console.log("Error in useGetMessage",error)
                // setMessages([]); 
            }
          }
        };
        getMessages();
    },[selectedConversation,setMessages])
    return {
        messages,loading
    };
}
export default useGetMessage;