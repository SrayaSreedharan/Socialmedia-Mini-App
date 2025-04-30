import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import SidebarProfile from './Components/Sidebarprofile';
import Home from './Pages/Home';

function App() {
  

  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/sidebarprofile" element={<SidebarProfile/>}/>
      
      
    </Routes>
    </BrowserRouter>
   
      
    </>
  )
}

export default App
