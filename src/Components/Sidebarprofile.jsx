import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Components/Sidebarprofile.css'
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SidebarProfile = () => {
  const[data,setData]=useState([])
  const[postdata,setPostdata]=useState({})
  const [posts, setPosts] = useState([]);
  const [postType, setPostType] = useState('both');
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [showEditPostForm, setShowEditPostForm] = useState(false);
  const [bio, setBio] = useState('');
  const [newusername, setusername] = useState(''); 
  
  useEffect(()=>{
    const id=localStorage.getItem("userId")
    axios.get(`https://reactecomapi.onrender.com/socioauth/user/${id}`).then((response)=>{
      console.log(response.data)
      setData([response.data])
    }).catch((error)=>{
      console.log(error)
    });
  },[])

  const handlechange=(e)=>{
    setPostdata({...postdata,[e.target.name]:e.target.value})
    console.log(postdata)
  }
  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    setPostdata({...postdata,imageUrls:e.target.files[0]})
    console.log(postdata)
  };

  const add = (e) => {
    e.preventDefault()
    console.log("button clicked")
    if(!postdata.text && !postdata.imageUrls ){
      console.log("error")
    }
    const id=localStorage.getItem("userId")
    console.log(id)
    const formdata = new FormData()
    formdata.append("image",postdata.imageUrls)
    formdata.append("text",postdata.text)
    formdata.append("userId",id)
    axios.post("https://reactecomapi.onrender.com/post/posting",formdata).then((response) => {
      console.log(response.data);
      setShowAddPostForm(false);
      }).catch((error )=> {
        console.error(error);
      });
  };

    useEffect(()=>{
      axios.get("https://reactecomapi.onrender.com/post/allpost").then((response)=>{
        console.log(response.data)
        setPosts(response.data)
      }).catch((error)=>{
        console.log(error)
      })
    },[])
  
   const handleSubmit=()=>{
    const id=localStorage.getItem("userId")
   axios.put(`https://reactecomapi.onrender.com/post/updateprofile/${id}`,{bio: bio,username: newusername,}).then((response)=>{
       console.log(response)
       setBio(response)
      //  const filtered= data.filter((item)=>{
      //   return item._id !== id
      // })
      // setData(filtered)
   }).catch((error)=>{
       console.log(error)
   })
   }

  return (
    <div className="sidebar-profile">
    <div className="card shadow-sm p-3 mb-4 bg-white rounded">
      
      {data&&data.map((item)=>(
        <div>
        <div className="text-center">
        <img src={item.profilePic}   width="100" height="100"/>

        <h5>{item.username}</h5>
        {newusername && <h5>{newusername} </h5>}
        <p>{item.bio}</p>
      
      </div>
      <div className="d-flex justify-content-around text-center mb-3">
        <div>
          <strong>6</strong>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>Posts</div>
        </div>
        <div>
          <strong>{item.followers}</strong>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>followers</div>
        </div>
        <div>
          <strong>{item.following}</strong>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>following</div>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center gap-3">
        <button className="btn btn-primary btn-sm " style={{width:'300px'}}  onClick={() => setShowEditPostForm(!showEditPostForm)}>Edit Profile</button>
        {showEditPostForm && (
        <div className="p-3">
          <textarea className="form-control mb-2" placeholder="bio..." value={bio} onChange={(e) => setBio(e.target.value)}/>
          <input type='text' className="form-control mb-2" placeholder="edit username" value={newusername} onChange={(e) => setusername(e.target.value)}/>
         <button className="btn btn-success w-100" onClick={handleSubmit}>save</button> 
        </div>
      )}
      <button className="btn btn-secondary btn-sm " style={{width:'300px'}}  onClick={() => setShowAddPostForm(!showAddPostForm)}>Add</button>
{showAddPostForm && (
  <div className="p-3">
    <label className="form-label">Select Post Type</label>
    <select className="form-select mb-3" value={postType} onChange={(e) => setPostType(e.target.value)}>
      <option value="text">Add Text</option>
      <option value="image">Add Image</option>
      <option value="both">Add Both</option>
    </select>
    {(postType === 'text' || postType === 'both') && (
      <textarea className="form-control mb-2" placeholder="Post text" name='text' onChange={handlechange}/>
    )}
    {(postType === 'image' || postType === 'both') && (
      <>
        <input type="file" accept="image/*" name='image' onChange={handleFileChange} className="form-control mb-2" />
      </>
    )}
    <button className="btn btn-success " onClick={(e)=>add(e)} style={{width:'300px'}}>Create Post</button>
  </div>
)}
     <button className="btn btn-outline-danger btn-sm " style={{width:'300px',color:'black',textDecoration:'none'}}><a href='/login'>Logout</a></button>
      </div>
      <hr />
      </div>
    ))} 

<div className="d-flex flex-wrap justify-content-left gap-3">
{posts.map((items)=>(
  <div>
  <Card style={{ width: '16rem',height:'16rem' }}>{<br></br>}
  <div className="text-center"><Card.Img variant="top" src={items.image}/></div>
      <Card.Body>
        <Card.Title>{items.text}</Card.Title>
        <div className="d-flex gap-2">
        <button className="btn btn-sm btn-outline-primary" style={{width:'80px',border:'none'}}>👍{items.like}</button>
        <button className="btn btn-sm btn-outline-secondary" style={{width:'80px',border:'none'}}>💬{items.comment}</button>
        </div>
      </Card.Body>
    </Card>
  </div>
))}
</div>
</div>
</div> 
);
};
export default SidebarProfile;
