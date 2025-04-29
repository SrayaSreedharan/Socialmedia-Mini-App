import React from 'react'
import { useState } from 'react';
import '../Pages/Signup.css'

const Signup = () => {
  const[login,setLogin]=useState("")
      const[error,setError]=useState([])
  
      const validate=()=>{
          const errormsg={}
          if(!login.name){
              errormsg.name="enter name"
          }
          if(!login.email){
            errormsg.email="enter email"
        }
        if(!login.username){
          errormsg.username="enter username"
      }
          if(!login.password){
              errormsg.password="enter password"
          }
          setError(errormsg)
          return Object.keys(errormsg).length==0
      }
  
      const handlechange=(e)=>{
          setLogin({...login,[e.target.name]:e.target.value})
      }
  
      const submit=(e)=>{
          e.preventDefault()
          if(!validate()){
              console.log("validation error")
          }
  
      }
  
  return (
    <div className="register">
      <div className="card">
        <div className="left">
      
    
          
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <label style={{color:"red"}}>{error.name}</label>
            <input type='text' name="name" placeholder='name' onChange={handlechange}/>{<br></br>}
            <label style={{color:"red"}}>{error.email}</label>
            <input type='text' name="email" placeholder='email' onChange={handlechange}/>{<br></br>}
            <label style={{color:"red"}}>{error.username}</label>
            <input type='text' name="username" placeholder='username' onChange={handlechange}/>{<br></br>}
            <label style={{color:"red"}}>{error.password}</label>
            <input type='text' name="password" placeholder='password'  onChange={handlechange}/>{<br></br>}
            <button type='submit' onClick={submit}>register</button>{<br></br>}
        </form>
        </div>
      </div>
    </div>
  );
};
export default Signup
