import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../Components/CSS/Register.css';
import img1 from '../mappic/South_Carolina_map.jpg';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import NavigationBar from '../Components/NavBar';
import Popup from 'reactjs-popup';


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

const zoomIn = () => {

}
const zoomOut = () => {
  
}
// ImageWithPins component
const ImageWithPins = ({ imageUrl }) => {
  const [pins, setPins] = useState([]);
  const [modalContent, setModalContent] = useState(null);

  const handleImageClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setPins([...pins, { x: offsetX, y: offsetY }]);
    
  };

  return (
    <div style={{ position: 'relative' }}>
      <img src={img1} width={1250} height={850} id="image" alt="Map" className="map-image" onClick={handleImageClick} />
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
      <NavigationBar />
      
      <div className="map-container">
      <ImageWithPins imageUrl="'../mappic/South_Carolina_map.jpg'" />
        </div>
        <div className="zoom-buttons">
          <button onclick="zoomIn()">Zoom In</button> 
          <button onclick="zoomOut()">Zoom Out</button>
        </div>
    </div>
  );
};

export default HomePage;


