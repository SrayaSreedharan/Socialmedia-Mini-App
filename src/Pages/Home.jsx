import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import Post from '../Components/Post';
import { useState,useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Pages/Home.css'

const Home = () => {
  const [post, setPosts] = useState([]);
  const[showAddComment,setShowAddComment]=useState(false)
  const[comments,setComments]=useState('')
  const [activePostId, setActivePostId] = useState(null);
  const [likedPosts, setLikedPosts] = useState(() => {
  const storedLikes = localStorage.getItem('likedPosts');
  return storedLikes ? JSON.parse(storedLikes) : [];
  });
  const [commentPosts, setcommentPosts] = useState(() => {
  const storedcomment = localStorage.getItem('commentPosts');
  return storedcomment ? JSON.parse(storedcomment) : [];
  });
  const [followposts, setfollowPosts] = useState(() => {
  const storedfollow = localStorage.getItem('followPosts');
  return storedfollow ? JSON.parse(storedfollow) : [];
  });
 

  useEffect(()=>{
    fetchPost()
  })
  
     const fetchPost= ()=>{
      axios.get("https://reactecomapi.onrender.com/post/allpost").then((response)=>{
      console.log(response.data)
      setPosts(response.data)
      }).catch((error)=>{
      console.log(error)
      })
      }

    useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }, [likedPosts]);

    useEffect(() => {
  localStorage.setItem('followPosts', JSON.stringify(followposts));
}, [followposts]);

    const clicklike=(postId)=>{   
    setLikedPosts((prev) =>
    prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]);
      const userId=localStorage.getItem("userId")
      axios.put(`https://reactecomapi.onrender.com/post/like/${postId}`,{userId}).then((response)=>{
      console.log(response)
        }).catch((error)=>{
          console.log(error)
        })
        useEffect(()=>{
    fetchPost()
  })
  
        
    }

    const handlechange=(postId,e)=>{
    setComments({...comments,[postId]:e.target.value });
    setActivePostId(postId);
    };

    useEffect(() => {
    localStorage.setItem('commentPosts', JSON.stringify(commentPosts));
    }, [commentPosts]);

    const comment=(postId)=>{
    setcommentPosts((prev) =>
    prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]);
       const id=localStorage.getItem("userId")
       const text=comments[postId]
       axios.post(`https://reactecomapi.onrender.com/post/comment/${postId}`,{id,text}).then((response)=>{
       console.log(response)
       setShowAddComment(false) 
       setActivePostId(null)
        }).catch((error)=>{
          console.log(error)
        })
    }

       const followUser=(id)=>{
        setfollowPosts((prev) =>
        prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]);
        const currentUserId=localStorage.getItem("userId")
      
       axios.put(`https://reactecomapi.onrender.com/post/user/${id}/follow`,{ currentUserId}).then((response)=>{
       console.log(response)
        }).catch((error)=>{
          console.log(error)
        })
        axios.put(`https://reactecomapi.onrender.com/post/user/${id}/unfollow`,{currentUserId}).then((response)=>{
          console.log(response)
        }).catch((error)=>{
          console.log(error)
        })
      }  
  return (
    <>
      <Navbar  />
      <div className="container-fluid ">
        <div className="row"  style={{backgroundColor:' rgb(193, 190, 255)'}}>
          <Sidebar  />
          <div className="col-md-8 margin">
{post.map((items,index)=>(
  <div>
    <div key={items._id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2 ">
                  {items.userId?.profilePic ? (
                  <img src={items.userId.profilePic} className="rounded-circle me-2" style={{ width: '40px', height: '40px', objectFit: 'cover' }} alt="Profile"/>
                ) : (
                  <div className="bg-secondary text-white rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontWeight: 'bold', fontSize: '1rem' }}>
                    {items.userId?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
                <strong>{items.userId.username}</strong>{<br></br>}
                <button className="flow-button mt-2"  onClick={()=>followUser(items.userId._id)}> {followposts.includes(items.userId._id) ? "following" : "follow"}</button>
                </div>
                  <p className="card-text">{items.text}</p>
                  {items.image && (
                    <img src={items.image} alt="Post" className="img-fluid rounded" style={{width:'200px',height:'150px'}}/>
                  )}{<br></br>}
                 <div className="d-flex gap-3 mt-3">
                  <button className="btn btn-sm btn-outline-primary" onClick={()=>clicklike(items._id)} style={{backgroundColor: likedPosts.includes(items._id) ? "green" : "#ffffff",color:'black'}}> {likedPosts.includes(items._id) ? "👍Liked" : "👍 Like"}{items.likes.length>0 && items.likes.length}</button>
                  <button className="btn btn-sm btn-outline-secondary"  onClick={()=>setShowAddComment(index)} >💬 {commentPosts.includes(items._id) ? "commented" : "comment"}</button>
                  {showAddComment === index&& (
                    <div key={index}>
                    {activePostId === items._id && (<p style={{ color: 'green' }}>Typing</p>)}
                    <textarea value={comments[items._id] || ""} placeholder="Write comment..." onChange={(e) => handlechange(items._id, e)}/>
                   <>
                    <button className="btn btn-success"  onClick={()=>comment(items._id)}>Add Comment</button>
                   </>
                   </div>
                  )}
                  <button className="btn btn-sm btn-outline-success">🔄 Share</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
{/* </div>
</div> */}
    </>
  );
};
export default Home;
