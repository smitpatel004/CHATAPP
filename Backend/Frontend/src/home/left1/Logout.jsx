

import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);

    try {
        console.log("IN TRY OF LOGOUT")
      const res = await axios.post("/api/user/logout", {}, { withCredentials: true });
      
      // Remove tokens
      localStorage.removeItem("token");
      Cookies.remove("jwt");

      toast.success("Logged out successfully");
      
      setTimeout(() => {
        window.location.reload();
      }, 500); // Short delay to allow cookie removal
      
    } catch (error) {
      console.error("Error in Logout:", error);
      toast.error("Error in logging out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[4%] bg-slate-950 text-white flex flex-col justify-end">
      <div className="p-3 align-bottom">
        <button onClick={handleLogout} disabled={loading}>
          <TbLogout2
            className={`text-5xl p-2 rounded-lg duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default Logout;
