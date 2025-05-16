import react, { createContext, useState } from 'react'
import { useContext } from 'react';
import Cookies from "js-cookie"
export const AuthContext=createContext();
export const  AuthProvider=({children})=>{
    const intialState=Cookies.get("jwt")||localStorage.getItem("token")
    const [user,setUser]=useState(intialState?JSON.parse(intialState):
    undefined
)
    return (
        <AuthContext.Provider value={{user,setUser}} >
            {children}</AuthContext.Provider>

      
    )
}
// export default AuthProvider
export const useAuth = () => {
    console.log("AuthContext value:", useContext(AuthContext)); // Debugging
    return useContext(AuthContext);
};

