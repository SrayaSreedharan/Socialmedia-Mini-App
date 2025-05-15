import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Components/Sidebarprofile.css'
import axios from 'axios';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Delete } from 'lucide-react';
import { FilePenLine } from 'lucide-react';

const SidebarProfile = () => {
  const[data,setData]=useState([])
  const[postdata,setPostdata]=useState({})
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [showEditPostForm, setShowEditPostForm] = useState(false); 
  const[editdata,setEditdata]=useState({})
  const [posts, setPosts] = useState([]);
  const [menuPostId, setMenuPostId] = useState(null);
  const [editText, setEditText] = useState("");

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
  e.preventDefault();
  const id = localStorage.getItem("userId");
  if (!postdata.text && !postdata.imageUrls) {
      alert("Please enter text or select an image.");
      return;
  }
  const formdata = new FormData();
    formdata.append("text", postdata.text);
    formdata.append("image", postdata.imageUrls);
    formdata.append("userId", id);
    axios.post("https://reactecomapi.onrender.com/post/posting", formdata).then((response) => {
      console.log("Post created:", response.data);
      setShowAddPostForm(false);
      setPostdata({});
      axios.get(`https://reactecomapi.onrender.com/post/userposts/${id}`).then((res) => {
        setPosts(res.data);
        }).catch((err) => console.log(err));
    }).catch((error) => {
      console.error("Post creation error:", error);
    });
};

   useEffect(()=>{
     const id=localStorage.getItem("userId")
      axios.get(`https://reactecomapi.onrender.com/post/userposts/${id}`).then((response)=>{
      console.log(response.data)
      setPosts(response.data)
      }).catch((error)=>{
      console.log(error)
      })
      },[])

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
       setShowEditPostForm(false)
       setData([response.data])
   }).catch((error)=>{
       console.log(error)
   })
   }

   const deletes=(postId)=>{
    axios.delete(`https://reactecomapi.onrender.com/post/delposting/${postId}`).then((response)=>{
      console.log(response)
        const filtered= posts.filter((item)=>{
        return item._id !== postId
      })
      setPosts(filtered)
    }).catch((error)=>{
      console.log(error)
    })
   }

const edit = (postId) => {
  axios.put(`https://reactecomapi.onrender.com/post/editpost/${postId}`, { text: editText }).then((response) => {
      console.log("Updated post:", response.data); 
      const updatedPosts = posts.map((post) => post._id === postId ? { ...post, text: editText } : post);
      setPosts(updatedPosts);
      setMenuPostId(null);
    }).catch((error) => {
      console.log(error);
    });
};

  return (
    <div className="sidebar-profile" style={{backgroundColor:' rgb(193, 190, 255)'}}>
    <div className="card shadow-sm p-3 mb-4 bg-white rounded">
      {data&&data.map((item)=>(
        <div key={item._id}>
        <div className="text-center">
        <img src={item.profilePic}   width="100" height="100" className='center' />
        <h5>{item.username}</h5>
        <p>{item.bio}</p>
      </div>
      <div className="d-flex justify-content-around text-center mb-3">
        <div>
          <strong>{posts.length}</strong>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>Posts</div>
        </div>
        <div>
          <strong>{item.followers.length}</strong>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>followers</div>
        </div>
        <div>
          <strong>{item.following.length}</strong>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>following</div>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center gap-3">
        <button className="btn btn-primary btn-sm " style={{width:'300px'}} onClick={()=>setShowEditPostForm(!showEditPostForm)}>Edit Profile</button>
        {showEditPostForm && (
      <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea className="form-control mb-2" placeholder="bio..." name='bio' onChange={handleschange}/>
          <input type='text' className="form-control mb-2" placeholder="edit username" name='username' onChange={handleschange}/>
          <input type='file'  name='profilePic' onChange={filechange}></input>
          <button className="btn btn-success " onClick={handleSubmit} style={{width:'100px',marginLeft:'60px'}}>save</button> 
        </Modal.Body>
      </Modal.Dialog>
    </div>
    )}
      <button className="btn btn-secondary btn-sm" style={{ width: '300px' }}onClick={() => setShowAddPostForm(!showAddPostForm)}>Add</button>
{showAddPostForm && (
  <div className="p-3">
    <textarea className="form-control mb-2" placeholder="typing your post" name="text" onChange={handlechange}/>
    <input type="file" accept="image/*" name="image" onChange={handleFileChange}className="form-control mb-2"/>
    <button className="btn btn-success" onClick={add} style={{ width: '300px' }}>Create Post</button>
  </div>
)}
     <button className="btn btn-outline-danger btn-sm " style={{width:'300px',color:'black',textDecoration:'none'}}><a href='/login'>Logout</a></button>
      </div>
      <hr />
      </div>
    ))} 
  <div className='d-flex flex-wrap gap-3 userpost'>
  {posts.map((data) => (
    <div key={data._id}>
      <Card style={{ width: '19rem'}}>
        <Card.Body>
          <Card.Text>{new Date(data.updatedAt).toLocaleString()}</Card.Text>
          <Card.Text>
            {data.text=="undefined"?"":data.text}
             {menuPostId === data._id && (
            <div>
              <input type="tex" className="border border-black" name="text" value={editText} onChange={(e) => setEditText(e.target.value)}/>
              <button className="btn btn-success" onClick={() => edit(data._id)} style={{ width: '70px',border:'none',backgroundColor:'white',color:'green' }}>Save</button>
            </div>
          )}
          </Card.Text>
         {data.image &&(
            <Card.Img variant="top" src={data.image}style={{borderRadius: '0px',height: '150px',width: '200px',marginLeft: '30px'}}/> 
          )}
          <div className="d-flex">
            <button className="btn btn-sm " style={{ width: '90px', border: 'none' }}>👍 {data.likes.length}</button>
            <button className="btn btn-sm " style={{ width: '140px', border: 'none' }}>💬 </button>
            <button className="btn btn-sm " style={{ width: '90px', border: 'none',color:'black'}} onClick={() => {setMenuPostId(menuPostId === data._id ? null : data._id);setEditText(data.text);}}><FilePenLine size={15} /></button>{<br></br>}
            <button className="btn btn-sm " style={{ width: '100px', border: 'none', color: 'red' }} onClick={() => deletes(data._id)}> <Delete size={18}/></button>
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
