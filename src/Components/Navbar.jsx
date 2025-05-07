import React from 'react';

const Navbar = () => {
 
  return(
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <a className="navbar-brand" href="#" style={{color:'white'}}>WELCOME</a>
    <div className="ms-auto text-white">
      <span className="me-3"><a href='/login' style={{textDecoration:'none'}}>LOGOUT</a></span>
    </div>
  </nav>
);
}
export default Navbar;
