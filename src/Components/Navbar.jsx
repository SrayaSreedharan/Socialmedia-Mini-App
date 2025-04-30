import React from 'react';
import { FaRegCircleUser } from "react-icons/fa6";


const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <a className="navbar-brand" href="#">CONNECTION</a>
    <div className="ms-auto text-white">
      <span className="me-3">logout</span>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY3567cgWsgJXa9k-6row17RbFxpHi0hIHoQ&s" alt="Profile" className="rounded-circle mb-3 shadow-sm" width="100" height="100"/>

      {/* <FaRegCircleUser />  */}
    </div>
  </nav>
);
export default Navbar;
