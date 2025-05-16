// import React from 'react'
// import { useForm } from "react-hook-form";
// import axios from 'axios'
// import { useAuth } from '../context/AuthProvider';
// export default function Login(){
//      const {user,setUser}=useAuth();
//       const { register, handleSubmit, watch, formState: { errors } } = useForm();
//         const onSubmit = data => {
//             const userInfo={
//                 email:data.email,
//                 password:data.password,
//             };
//             console.log("📤 Sending Data:", JSON.stringify(userInfo)); 
//             axios.post("/api/user/login", userInfo, {
//                 headers: { "Content-Type": "application/json" },
//             })
//             .then((response) => {
//                 console.log("✅ Response:", response.data);
//                 if(response.data){
//                     alert("login sucessfully")
//                 }
//                 localStorage.setItem("token",JSON.stringify(response.data))
//                 setUser(response.data);
//             })
//             .catch((error) => {
//                 if(error.response){
//                     alert("Error:"+error.response.data.message)
//                 }
//                 console.log("❌ Error:", error.response ? error.response.data : error.message);
//             });
//             console.log(userInfo)
//         }
      
//         return (
//             <>
//                 <div>Login
//             <form onSubmit={handleSubmit(onSubmit)}  className='border boeder-black px-6 py-3 rounded-md space-y-3 w-96 my '  >
//                 <label htmlFor="">
//                     Email
//                 </label>
//                 <input type="Email" className='border '  {...register("email", { required: true })}  />
//                 <br />
//                 <label htmlFor=""  >
//                     password
//                 </label>
//                 <input type="password"    {...register("password", { required: true })}  className='border '/>
//                 <br />
               
//                 <br />
//                <input type="submit" value="Login" className='text-white bg-blue-600 w-full  cursor-pointer rounded-lg py-2 ' />
//             </form>
//             </div>
//             </>
//         )
// }
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

export default function Login() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const userInfo = {
      email,
      password,
    };
    
    try {
      const response = await axios.post("/api/user/login", userInfo, {
        headers: { "Content-Type": "application/json" },
      });
      
      console.log("✅ Response:", response.data);
      localStorage.setItem("token", JSON.stringify(response.data));
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response ? error.response.data.message : "Login failed. Please try again.";
      setError(errorMsg);
      console.log("❌ Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md p-6 space-y-8 bg-slate-800 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Sign in to your account</h2>
          <p className="mt-2 text-sm text-slate-400">
            Or{' '}
            <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
              create a new account
            </a>
          </p>
        </div>
        
        {error && (
          <div className="p-3 text-sm font-medium text-red-800 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 text-slate-300 placeholder-slate-500 border border-slate-600 rounded-md shadow-sm appearance-none bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 text-slate-300 placeholder-slate-500 border border-slate-600 rounded-md shadow-sm appearance-none bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-slate-600 rounded bg-slate-700 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-slate-400">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}