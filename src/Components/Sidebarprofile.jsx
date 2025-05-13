import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Components/Sidebarprofile.css'
import axios from 'axios';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';

const SidebarProfile = () => {
  const[data,setData]=useState([])
  const[postdata,setPostdata]=useState({})
  const [postType, setPostType] = useState('both');
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [showEditPostForm, setShowEditPostForm] = useState(false); 
  const[editdata,setEditdata]=useState({})
  const [posts, setPosts] = useState([]);
  const [menuPostId, setMenuPostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
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
      setPostdata({});
      }).catch((error )=> {
        console.error(error);
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
    console.log(response.data)
    const updatedPost = Array.isArray(response.data)? response.data.find((p) => p._id === postId): response.data;
    const updatedPosts = posts.map((post) =>post._id === postId ? { ...post, text: updatedPost.text } : post);
      setPosts(updatedPosts);
      setEditingPostId(null);
      setMenuPostId(null);
    })
    .catch((error) => {
      console.log(error);
    });
};

return (
    <div className="sidebar-profile">
    <div className="card shadow-sm p-3 mb-4 bg-white rounded">
      {data&&data.map((item)=>(
        <div key={item._id}>
        <div className="text-center">
        <img src={item.profilePic}   width="100" height="100" className='center'/>
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
        <button className="btn btn-primary btn-sm " style={{width:'300px'}}  onClick={() => setShowEditPostForm(!showEditPostForm)}>Edit Profile</button>
        {showEditPostForm && (
        <div className="p-3">
          <textarea className="form-control mb-2" placeholder="bio..." name='bio' onChange={handleschange}/>
          <input type='text' className="form-control mb-2" placeholder="edit username" name='username' onChange={handleschange}/>
          <input type='file'  name='profilePic' onChange={filechange}></input>
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
  <div className='d-flex flex-wrap gap-3 userpost'>
  {posts.map((data) => (
    <div key={data._id}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Text>{new Date(data.updatedAt).toLocaleString()}</Card.Text>
          <button className="btn btn-sm" style={{ width: '90px', border: 'none', marginLeft: '200px', marginTop: '-90px' }} onClick={() => {setMenuPostId(menuPostId === data._id ? null : data._id);setEditText(data.text);}}>☰</button>
          {menuPostId === data._id && (
            <div>
              <button className="btn btn-sm btn-outline-primary" style={{ width: '100px', border: 'none', color: 'red' }} onClick={() => setEditingPostId(data._id)}>EDIT TEXT</button>
              {editingPostId === data._id && (
                <div>
                  <input type="text" className="border border-black" name="text" value={editText} onChange={(e) => setEditText(e.target.value)}/>
                  <button className="btn btn-success" onClick={() => edit(data._id)} style={{ width: '70px' }}>Save</button>
                </div>
              )}
              <button className="btn btn-sm btn-outline-primary" style={{ width: '100px', border: 'none', color: 'red' }} onClick={() => deletes(data._id)}>DELETE</button>
            </div>
          )}
          <Card.Text>{data.text}</Card.Text>
          {data.image && (<Card.Img variant="top" src={data.image} style={{borderRadius: '0px',height: '150px',width: '200px',marginLeft: '20px',}}/>  
          )}
          <div className="d-flex">
            <button className="btn btn-sm btn-outline-primary" style={{ width: '90px', border: 'none' }}>👍 Like</button>
            <button className="btn btn-sm btn-outline-primary" style={{ width: '140px', border: 'none' }}>💬 comment</button>
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
