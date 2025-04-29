import React, { useState } from 'react'
import '../Pages/Login.css'

const Login = () => {
    const[login,setLogin]=useState("")
    const[error,setError]=useState({})

    const handlechange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
    }

    const validate=()=>{
        const errormsg={}
        if(!login.name){
            errormsg.name="enter name"
        }
        if(!login.password){
            errormsg.password="enter password"
        }
        setError(errormsg)
        return Object.keys(errormsg).length===0
    }

    const handlesubmit=(e)=>{
        e.preventDefault()
        if(!validate()){
            console.log("validation error")
        }
    }

  return (
         <div className="login">
      <div className="card">
        <div className="left">
          <h1>WELCOME</h1>
          <p>
           Keep connection with friends and share lots of positive things,Enjoy with sharing post and memorable comments
          </p>
        </div>
        <div className="right">
          <form>
          <h1>Login</h1>
            <label style={{color:"red"}}>{error.name}</label>
            <input type='text' name="name" placeholder='usename' onChange={handlechange}/>{<br></br>}
            <label style={{color:"red"}}>{error.password}</label>
            <input type='text' name="password" placeholder='password'  onChange={handlechange}/>{<br></br>}
            <button type='submit' onClick={handlesubmit}>login</button>{<br></br>}
            <h6>Do you have create account? <a href='/signup'>Signup</a></h6>
        </form>
        </div>
      </div>
    </div>
  )
}
export default Login
