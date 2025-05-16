import React, { useState } from "react";
import { FaSearchDollar } from "react-icons/fa";
import UserGetAlluser from "../../context/UserGetAlluser";
import userConversation from "../../stateMange/useConversation";
export default function Search(){
  const [search,setSearch]=useState("")
  const [alluser] =UserGetAlluser()
  const {setSelectedConversation}= userConversation()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = alluser.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      console.log("NOT FIND")
      // toast.error("User not found");
    }
  };
    return (
     <div className="h-[10vh]" >

<div className="px-6 py-4 " >  
             <form onSubmit={handleSubmit}>
        <div className="flex" >
        

         <label className="  border-[1px]  border-gray-700  bg-slate-900  rounded-lg   flex items-center gap-2 w-[80%] ">
  <input type="text" className="grow outline-none " placeholder="Search"  value={search} onChange={(e)=>{setSearch(e.target.value)}}  />
</label>
<button><FaSearchDollar className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300  "  /></button>


        
        </div>
        </form>
        </div>


     </div>
    )
}