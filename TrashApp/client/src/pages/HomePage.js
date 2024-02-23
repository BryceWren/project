import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../Components/CSS/Register.css';
import img1 from '../mappic/South_Carolina_map.jpg'
import home from '../mappic/home.png'
import ballot from '../mappic/ballot.png'
import cog from '../mappic/3917058.png'



/*export const HomePage = () => {
  
  const navigate= useNavigate()
  return (
    
      <div className="map-container">
        
      
      <img src={img1} width={1250} height={900} id="image" alt="Map" className="map-image" />
      <button onclick="zoomIn()">Zoom In</button>
      <button onclick="zoomOut()">Zoom Out</button>
      
      <div className="bottom-icons">
        <img src={home} alt="Icon 1" className="bottom-icons" />
        <img src={ballot} alt="Icon 2" className="bottom-icons" />
        <img src={cog} alt="Icon 3" className="bottom-icons" />
      
      <button className="logoutbtn" onClick={() => navigate('/')}>LOGOUT</button>
    </div>
    </div>
  );



}
*/


export const Pin = ({ x, y }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: '50%',
      }}
    ></div>
  );
};

// ImageWithPins component
const ImageWithPins = ({ imageUrl }) => {
  const [pins, setPins] = useState([]);

  const handleImageClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setPins([...pins, { x: offsetX, y: offsetY }]);
  };

  return (
    <div style={{ position: 'relative' }}>
      <img src={img1} width={1250} height={900} id="image" alt="Map" className="map-image" onClick={handleImageClick} />
      {pins.map((pin, index) => (
        <Pin key={index} x={pin.x} y={pin.y} />
      ))}
    </div>
  );
};

// App component
export const HomePage = () => {
  return (

    <div>
      <div className="map-container">
      <ImageWithPins imageUrl="'../mappic/South_Carolina_map.jpg'" />
        
        <div className="zoom-buttons">
          <button onclick="zoomIn()">Zoom In</button> 
          <button onclick="zoomOut()">Zoom Out</button>
        </div>
        
        {/* <div className="bottom-icons">
        <img src={home} alt="Icon 1" className="bottom-icons" />
        <img src={ballot} alt="Icon 2" className="bottom-icons" />
        <img src={cog} alt="Icon 3" className="bottom-icons" />
        </div> */}
        </div>
    </div>

  );
};

export default HomePage;


