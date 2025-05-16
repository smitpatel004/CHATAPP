import react, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import axios from "axios";
  function UserGetAlluser(){
    const [alluser,setAlluser]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{

        const getUsers = async()=>{
            setLoading(true);
     
        try {
           const token=Cookies.get("jwt")
        const response= await axios.get("/api/user/alluser",{
            Credentials:"include",
            headers:{
              
                Authorization: `Bearer ${token}`
            }
        })
        
          setAlluser(response.data.alluser || []);
        // setAlluser(Array.isArray(response.data) ? response.data : []);
        setLoading(false)
        } 
        catch (error) {
            console.log("ERROR IN USERGET"+error)
            
        };
    }
        getUsers();
    },[]);

    return [alluser,loading]

   
}
export default UserGetAlluser

