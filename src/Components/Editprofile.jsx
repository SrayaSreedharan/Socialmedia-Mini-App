import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const Editprofile = () => {
    const[editdata,setEditdata]=useState({})
    // const[data,setData]=useState([])

    const handleschange=(e)=>{
    setEditdata({...editdata,[e.target.name]:e.target.value})
    console.log(editdata)
    }
    
    const filechange = (e) => {
    console.log(e.target.files[0])
    setEditdata({...editdata,profilePic:e.target.files[0]})
    console.log(editdata)
    };

   const handleSubmit=()=>{
   const id=localStorage.getItem("userId")
   const formdata = new FormData()
   formdata.append("bio",editdata.bio)
   formdata.append("username",editdata.username)
   formdata.append("profilePic",editdata.profilePic)
   axios.put(`https://reactecomapi.onrender.com/post/updateprofile/${id}`,formdata).then((response)=>{
       console.log(response.data)
    //    setData([response.data])
   }).catch((error)=>{
       console.log(error)
   })
   }
  return (
    <div style={{display:'flex',justifyContent:'center',alignContent:'center',marginTop:'100px'}}>
        <Card style={{ width: '20rem',height:'340px' }}>
      <Card.Body>
        <Card.Title style={{textAlign:'center'}}>Edit profile</Card.Title>
        <Card.Text style={{marginTop:'20px'}}>
          <textarea className="form-control mb-2" placeholder="bio..." name='bio' onChange={handleschange}/>
          <input type='text' className="form-control mb-2" placeholder="edit username" name='username' onChange={handleschange}/>
          <input type='file'  name='profilePic' onChange={filechange}></input>
        </Card.Text>
        <button className="btn btn-success " onClick={handleSubmit} style={{width:'100px',marginLeft:'80px',marginTop:'30px'}}>save</button> 
      </Card.Body>
    </Card>
    </div>
  )
}
export default Editprofile
