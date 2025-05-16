import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Left from './home/left/Left'
import Right from './home/right/Right'
import Logout from './home/left1/Logout'
import Signup from './componenets/signUp'
import Login from './componenets/Login'
import { useAuth } from './context/AuthProvider';
import { Routes, Route, Navigate } from 'react-router-dom'
import Loading from './componenets/Loading'
function App() {
  const [count, setCount] = useState(0)
  const { user, setUser } = useAuth();
  console.log(user)

  return (
    <>
      <Routes>
        <Route path="/" element={
          user ? (<div className='flex h-screen ' >
            <Logout></Logout>
            <Left>

            </Left>
            <Right></Right></div>) : (
            <Navigate to={"/login"} />
          )
        } />
        <Route path="/login" element={user ? <Navigate to={"/"} /> : <Login />} ></Route>
        <Route path="/signup" element={user ? <Navigate to={"/"} /> : <Signup />} ></Route>
      </Routes>
      {/* <Loading></Loading> */}
    </>
  )
}

export default App
