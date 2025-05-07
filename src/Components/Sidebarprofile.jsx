import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Components/Sidebarprofile.css'
import axios from 'axios';
import { useState } from 'react';

const SidebarProfile = () => {
  const[data,setData]=useState([])
  // const [userId, setUserId] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); 
    }
  };

  const add = () => {
    const newPost = [{
      text: text,
      image: image, 
    }];
    axios.post("https://reactecomapi.onrender.com/post/posting",newPost).then((response) => {
        console.log(response.data);
      }).catch((error )=> {
        console.error(error);
      });
  };

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
          <textarea className="form-control mb-2" placeholder="Write a bio..." value={bio} onChange={(e) => setBio(e.target.value)}/>
          <input type='text' className="form-control mb-2" placeholder="Write a bio..." value={newusername} onChange={(e) => setusername(e.target.value)}/>
         

          <button className="btn btn-success w-100" onClick={ handleSubmit}>Save Bio</button>
        </div>
      )}
        <button className="btn btn-outline-danger btn-sm " style={{width:'300px'}}><a href='/login'>Logout</a></button>
      </div>
      <hr />
      </div>
    ))}
{/* <div>
<div className="story-highlights">
  <figure>
    <img src="src/Images/post1.jpg" alt="Highlight 1" />
    <figcaption>Highlight 1</figcaption>
  </figure>
  <figure>
    <img src="src/Images/post2.jpg" alt="Highlight 2" />
    <figcaption>Highlight 2</figcaption>
  </figure>
  <figure>
    <img src="src/Images/post3.jpg" alt="Highlight 3" />
    <figcaption>Highlight 3</figcaption>
  </figure>
  <figure>
    <img src="src/Images/post4.jpeg" alt="Highlight 4" />
    <figcaption>Highlight 4</figcaption>
  </figure>
</div>
<div className="photo-grid">
  <div className="photo-card">
    <div className="image-container">
      <img src="src/Images/post1.jpg" alt="Post 1" />
    </div>
    <div className="photo-meta">
      <span className="likes">❤️ 120</span>
      <span className="comments">💬 45</span>
    </div>
  </div>
  <div className="photo-card">
    <div className="image-container">
      <img src="src/Images/post2.jpg" alt="Post 1" />
    </div>
    <div className="photo-meta">
      <span className="likes">❤️ 120</span>
      <span className="comments">💬 45</span>
    </div> 
  </div>
  <div className="photo-card">
    <div className="image-container">
      <img src="src/Images/post3.jpg" alt="Post 1" />
    </div>
    <div className="photo-meta">
      <span className="likes">❤️ 120</span>
      <span className="comments">💬 45</span>
    </div>
  </div>
  <div className="photo-card">
    <div className="image-container">
      <img src="src/Images/post4.jpeg" alt="Post 1" />
    </div>
    <div className="photo-meta">
      <span className="likes">❤️ 120</span>
      <span className="comments">💬 45</span>
    </div>
  </div>
  <div className="photo-card">
    <div className="image-container">
      <img src="src/Images/post6.jpeg" alt="Post 1" />
    </div>
    <div className="photo-meta">
      <span className="likes">❤️ 120</span>
      <span className="comments">💬 45</span>
    </div>
  </div>
  </div>
  </div>
  </div>
  </div> */}
  
      <button  onClick={() => setShowAddPostForm(!showAddPostForm)} style={{width:'200px'}}>Add</button>
      {showAddPostForm && (
          <div className="p-3">
            <textarea className="form-control mb-2" placeholder="Post text" value={text} onChange={(e) => setText(e.target.value)}/>
            <input type="file" accept="image/*" onChange={handleFileChange}/>
      {image && <img src={image} alt="Preview" width="150" />}
            <button className="btn btn-success w-100" onClick={add}>Create Post</button>
          </div>
        )}
      <button style={{width:'200px'}}>view</button>
    </div>
    </div> 
);
};
export default SidebarProfile;
