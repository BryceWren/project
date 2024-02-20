import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../pages/HomePage.css'
import img1 from '../mappic/South_Carolina_map.jpg'
import home from '../mappic/home.png'
import ballot from '../mappic/ballot.png'
import cog from '../mappic/3917058.png'



export const HomePage = () => {
  const navigate= useNavigate()
  return (
    
    <div className="map-container">
      {/* Image for the map */}
      <img src={img1} width={1250} height={900} id="image" alt="Map" className="map-image" />
      <button onclick="zoomIn()">Zoom In</button>
      <button onclick="zoomOut()">Zoom Out</button>
      {/* Bottom icons */}
      <div className="bottom-icons">
        <img src={home} alt="Icon 1" className="bottom-icons" />
        <img src={ballot} alt="Icon 2" className="bottom-icons" />
        <img src={cog} alt="Icon 3" className="bottom-icons" />
      </div>
      <button className="logoutbtn" onClick={() => navigate('/')}>LOGOUT</button>
    </div>

  );


}

export default HomePage;