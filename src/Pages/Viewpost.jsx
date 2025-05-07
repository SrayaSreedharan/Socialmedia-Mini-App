import axios from 'axios';
import { useEffect, useState } from 'react';

const Viewpost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://reactecomapi.onrender.com/post/allpost').then((response) => {
        console.log(response)
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}


export default Viewpost
