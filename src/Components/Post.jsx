import React from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
const Post = ({ username, content, time , image ,image1}) => (
  <div className="card mb-4 shadow-sm">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="card-title mb-0"><FaRegCircleUser /> {username}</h5>
        <small className="text-muted">{time}</small>
      </div>
      <p className="card-text">{content}</p>
      {image && (<img src={image}  className="img-fluid rounded mt-2" />)}
      {image1 && (<img src={image1} className="img-fluid rounded mt-2 ml-5 gap-3" />)}
      <div className="d-flex gap-3 mt-3">
        <button className="btn btn-sm btn-outline-primary">👍 Like</button>
        <button className="btn btn-sm btn-outline-secondary">💬 Comment</button>
        <button className="btn btn-sm btn-outline-success">🔄 Share</button>
      </div>
    </div>
  </div>
);
export default Post;
