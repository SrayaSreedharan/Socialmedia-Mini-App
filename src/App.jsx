import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import SidebarProfile from './Components/Sidebarprofile';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Explore from './Components/Explore';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/sidebarprofile" element={<SidebarProfile/>}/>
      <Route path="/explore" element={<Explore/>}/>
    </Routes>
    </BrowserRouter> 
    </>
  )
}
export default App
