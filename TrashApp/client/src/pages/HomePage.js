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
import ReactMapGL, { Marker,NavigationControl,GeolocateControl, FullscreenControl } from 'react-map-gl';


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
/*
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
*/

export const HomePage = () => {
  
  const [viewport, setViewPort] = useState({
   latitude: 32.6549967,
   longitude: -79.9406093,
    zoom: 10
  });
  const mapKey = process.env.REACT_APP_MAPBOX_TOKEN;
  return (
    <div>
    <NavigationBar />


    <div className= "map-container"style ={{width: "68vw", height: "90vh", alignContent: "center"}}>
      <ReactMapGL
        mapboxAccessToken={mapKey}
        {...viewport}
        onMove={evt => setViewPort(evt.viewport)}
        transitionDurations = "200"
        mapStyle={"mapbox://styles/mapbox/streets-v9"}
      >
        <Marker longitude={-122.4} latitude={37.8} color="red"/>
        <NavigationControl
    position="bottom-right"
    />
    <FullscreenControl/>
    <GeolocateControl/>
        </ReactMapGL>
    </div>
    </div>

  );
}

export default HomePage

