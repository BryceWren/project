import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const HomePage = () => {
  const navigate= useNavigate()
  return (
    <div>
      <p>{"this is the map page"}</p>
      <button className="link-btn" onClick={() => navigate('/')}>LOGOUT</button>
    </div>
  );
};

export default HomePage;