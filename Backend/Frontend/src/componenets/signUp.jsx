// import React from 'react'
// import { useForm } from "react-hook-form";
// import axios from 'axios'
// import { useAuth } from '../context/AuthProvider';

// export default function Signup(){
//     const { register, handleSubmit, watch, formState: { errors } } = useForm();
//     const {user,setUser}=useAuth();
//     const password=watch("password","")
//     const confirmPassword=watch("confirmPassword","")
//     const validatePasswordMatch = (value) => {
//         return value === watch("password") || "Passwords do not match";
//     };
//     const onSubmit =async(data) => {
//         const userInfo={
//             name:data.name,
//             email:data.email,
//             password:data.password,
//             confirmPassword:data.confirmPassword,
//         };
//         console.log("📤 Sending Data:", JSON.stringify(userInfo)); 
//       await  axios.post("/api/user/signup", userInfo, {
//             headers: { "Content-Type": "application/json" },
//         })
//         .then((response) => {
//             console.log("✅ Response:", response.data);
//             if(response.data){
//                 alert("signup sucessfully")
//             }
//             localStorage.setItem("token",JSON.stringify(response.data))
//             setUser(response.data);
//         })
//         .catch((error) => {
//             if(error.response){
//                 alert("Error:"+error.response.data.error)
//             }
//             console.log("❌ Error:", error.response ? error.response.data : error.message);
//         });
//         console.log(userInfo)
//     }
  

//     return (
//         <>
//           <div>Signup
//             <form onSubmit={handleSubmit(onSubmit)}className='border boeder-black px-6 py-3 rounded-md space-y-3 w-96 my '  >
//                 <label htmlFor=""  >
//                     Name
//                 </label>
//                 <input type="text"   {...register("name", { required: true })}   className='border '/>
//                 <br />
//                 <label htmlFor="">
//                     Email
//                 </label>
//                 <input type="Email"   {...register("email", { required: true })}  className='border '  />
//                 <br />
//                 <label htmlFor="">
//                     password
//                 </label>
//                 <input type="password"   {...register("password", { required: true,validate:validatePasswordMatch })}   className='border '/>
//                 <br />
//                 <label htmlFor="">
//                     confirm password
//                 </label>
//                 <input type="password"   {...register("confirmPassword", { required: true,validate:validatePasswordMatch })}   className='border '/>
//                 <br />
//                <input type="submit" value="signup" className='text-white bg-blue-600 w-full  cursor-pointer rounded-lg py-2 ' />
//             </form>
//             </div></>
      
//     )
// } 
import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useAuth } from '../context/AuthProvider';

export default function Signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { user, setUser } = useAuth();
    const password = watch("password", "")
    const confirmPassword = watch("confirmPassword", "")
    
    const validatePasswordMatch = (value) => {
        return value === password || "Passwords do not match";
    };

    const onSubmit = async (data) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        };
        console.log("📤 Sending Data:", JSON.stringify(userInfo));

        await axios.post("/api/user/signup", userInfo, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            console.log("✅ Response:", response.data);
            if (response.data) {
                alert("Signup successfully");
            }
            localStorage.setItem("token", JSON.stringify(response.data))
            setUser(response.data);
        })
        .catch((error) => {
            if (error.response) {
                alert("Error: " + error.response.data.error)
            }
            console.log("❌ Error:", error.response ? error.response.data : error.message);
        });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 text-slate-100">
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className='bg-slate-800 p-8 rounded-xl shadow-md w-full max-w-md space-y-4'
            >
                <h2 className="text-2xl font-bold text-center text-white mb-4">Sign Up</h2>
                
                <div>
                    <label>Name</label>
                    <input 
                        type="text" 
                        {...register("name", { required: true })} 
                        className='w-full mt-1 px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        {...register("email", { required: true })} 
                        className='w-full mt-1 px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        {...register("password", { required: true, validate: validatePasswordMatch })} 
                        className='w-full mt-1 px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                </div>

                <div>
                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        {...register("confirmPassword", { required: true, validate: validatePasswordMatch })} 
                        className='w-full mt-1 px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                </div>

                <input 
                    type="submit" 
                    value="Sign Up" 
                    className='w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold cursor-pointer text-white' 
                />
            </form>
        </div>
    )
}
