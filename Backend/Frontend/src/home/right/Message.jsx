

import React, { useEffect, useRef } from "react";
import Mess from "./Mess";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../componenets/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.jsx";

function Messages() {
  const { loading, messages = [] } = useGetMessage();
  useGetSocketMessage(); // listing incoming messages
  console.log("MESSAGES (Full Structure):", messages);

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  // Make sure messages contain the senderId
  messages.forEach((msg, index) => {
    console.log(`Message ${index + 1}: senderId =`, msg.senderId);
  });

  return (
    <div className="flex-1 overflow-y-auto" style={{ minHeight: "calc(92vh - 8vh)" }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {messages.length === 0 ? (
            <div>
              <p className="text-center mt-[20%]">Say! Hi to start the conversation</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={message._id} ref={index === messages.length - 1 ? lastMsgRef : null}>
                <Mess sender={message} />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default Messages;
