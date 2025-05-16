

import React from "react";
import UserChat from "./UserChat";
import Message from "./Message";
import Type from "./Type";

export default function Right() {
  return (
    <div className="w-[70%] border border-white bg-slate-800 flex flex-col h-screen">
      <div className="border-b border-slate-600">
        <UserChat />
      </div>
      <div className="flex-grow overflow-auto">
        <Message />
      </div>
      <div className="border-t border-slate-600">
        <Type />
      </div>
    </div>
  );
}