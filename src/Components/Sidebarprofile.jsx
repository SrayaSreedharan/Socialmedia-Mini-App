import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Components/Sidebarprofile.css'

const SidebarProfile = () => {
  return (
    <div className="sidebar-profile">
    <div className="card shadow-sm p-3 mb-4 bg-white rounded">
      <div className="text-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY3567cgWsgJXa9k-6row17RbFxpHi0hIHoQ&s" alt="Profile" className="rounded-circle mb-3 shadow-sm" width="100" height="100"/>
        <h5 className="mb-0">Sraya sreedharan</h5>
        <small className="text-muted">Frontend Developer{<br></br>}Kozhikode</small>
        <p>
                Passionate Frontend Developer living with ideas.
                #Malayali,#developer
              </p>
      </div>
      <hr />
      <div className="d-flex justify-content-around text-center mb-3">
        <div>
          <strong>6</strong>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>Posts</div>
        </div>
        <div>
          <strong>1k</strong>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>Followers</div>
        </div>
        <div>
          <strong>430</strong>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>Following</div>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center gap-3">
        <button className="btn btn-primary btn-sm " style={{width:'300px'}}>Edit Profile</button>
        <button className="btn btn-outline-danger btn-sm " style={{width:'300px'}}>Logout</button>
      </div>
      <hr />
<div>
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
  </div>
  );
};
export default SidebarProfile;
