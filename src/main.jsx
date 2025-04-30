import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Pages/Home.jsx'
import SidebarProfile from './Components/Sidebarprofile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Login/> */}
    {/* <Signup/> */}
    {/* <Home/> */}
    <SidebarProfile/>
  </StrictMode>,
)
