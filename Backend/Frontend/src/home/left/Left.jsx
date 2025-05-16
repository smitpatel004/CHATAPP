import React from "react";
import Search from "./Search";
import User from "./User";


export default function Left(){
    return (
        <div className=' w-[30%]   bg-black text-white border border-black' >
            <h1 className="fond-bold text-2xl" >Chat App</h1>
        <Search></Search>
        <hr />  
        <User></User>
       
 
        </div>
    )
}