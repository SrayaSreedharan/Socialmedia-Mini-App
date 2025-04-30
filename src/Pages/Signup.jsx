import React from 'react'
import { useState } from 'react';
import '../Pages/Signup.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const[signup,setSignup]=useState("")
      const[error,setError]=useState([])
      
      const navigate=useNavigate()
      const validate=()=>{
          const errormsg={}
          if(!signup.name){
              errormsg.name="enter name"
          }
          if(!signup.email){
            errormsg.email="enter email"
        }
        if(!signup.username){
          errormsg.username="enter username"
      }
          if(!signup.password){
              errormsg.password="enter password"
          }
          setError(errormsg)
          return Object.keys(errormsg).length==0
      }
  
      const handlechange=(e)=>{
          setSignup({...signup,[e.target.name]:e.target.value})
      }
  
      const submit=(e)=>{
        if(!validate()){
          console.log("error")
      }
        e.preventDefault()
        axios.post("https://reactecomapi.onrender.com/auth/usersignup",signup).then((response)=>{
          console.log(response)
          navigate('/login')
        }).catch((error)=>{
          console.log(error)
        })
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
