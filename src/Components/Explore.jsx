import React from 'react';
import '../Components/Explore.css';
import profile1 from '../images/story1.jpg';
import profile2 from '../images/story2.jpg';
import profile3 from '../images/story3.jpg';
import profile4 from '../images/story5.jpg';
import profile5 from '../images/story6.jpg';
import profile6 from '../images/story7.png';

const users = [
  { name: 'John Doe', img: profile1 },
  { name: 'Jane Smith', img: profile2 },
  { name: 'Alex Johnson', img: profile3 },
  { name: 'Emily Davis', img: profile4 },
  { name: 'Chris Lee', img: profile5 },
  { name: 'Nina Patel', img: profile6 },
  { name: 'Mark Taylor' }, 
  { name: 'Sophie Brown' }, 
  { name: 'Daniel ', img: profile5 },
  { name: 'Ava Wilson', img: profile6 },
  { name: 'Leo Adams' } 
];

const Explore = () => {
  return (
    <div className="explore-containers">
    {users.map((user, index) => (
  <div className="explore-cards mt-6" key={index}>
    <div className="explore-top">
      <div className="explore-img">
        <img src={user.img} alt={user.name} />
      </div>
      <div className="explore-info">
        <strong>{user.name}</strong>
      </div>
    </div>
    <button className="follow-btns">Follow</button>
  </div>
))}
</div>
  )
}
export default Explore;
