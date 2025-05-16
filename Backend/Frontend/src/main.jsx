import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from './context/AuthProvider.jsx'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './context/SocketContext.jsx'


// createRoot(document.getElementById('root')).render(
//   <AuthProvider>
//     <App/>
//   </AuthProvider>
// )
ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <AuthProvider>
  <SocketProvider>
  <App />
  </SocketProvider>
  
  </AuthProvider>
  </BrowserRouter>
);
