import React, { useState } from 'react';
import '../Components/CSS/Register.css';
import NavigationBar from '../Components/NavBar';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, FullscreenControl, Popup } from 'react-map-gl';
import { useCookies } from 'react-cookie';
import Axios from 'axios';

export const HomePage = () => {
const [cookies] = useCookies(['email', 'firstName'])
const userEmail= cookies.email;
const name = cookies.firstName;

  const [viewport, setViewPort] = useState({
    latitude: 32.6549967,
    longitude: -79.9406093,
    zoom: 10
  });

  const [markers, setMarkers] = useState([]); /* PIN STUFF */
  const [popupInfo, setPopupInfo] = useState(null);
  const [pinColor, setPinColor] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  /* CLICK FOR PINS */
  const handleClick = ({ lngLat }) => {
    const { lng, lat } = lngLat;
    setPopupInfo({ longitude: lng, latitude: lat });
  }

  const handlePopupClose = () => {
    setPopupInfo(null);
  }

  const handleAddPin = async () => {
    
    if (popupInfo && (pinColor === "red" || pinColor === "yellow")) {
      setMarkers([...markers, { id: new Date().getTime(), longitude: popupInfo.longitude, latitude: popupInfo.latitude, color: pinColor, date, time, description }]);
      setPopupInfo(null);
      // Clear input fields after adding pin
      setDate('');
      setTime('');
      setDescription('');
      setPinColor('');
      locationdb(); //check this
    }

  }

  const mapKey = process.env.REACT_APP_MAPBOX_TOKEN;

  const locationdb = async () => {

        console.log(markers.longitude)
    try {
        const response = await Axios.post("http://localhost:5000/home", {
          backlong: popupInfo.longitude,
          backlat: popupInfo.latitude,
        });
        console.log(response)

    }catch (error) {
        console.error('An error ocurred:', error)
    }
    };

  return (
    <div>

      <NavigationBar />

      <div style={{ width: "100vw", height: "95vh", alignContent: "center" }}>
        <ReactMapGL
          onClick={handleClick}
          width="100%"
          height="100%"
          mapboxAccessToken={mapKey}
          {...viewport}
          onMove={evt => setViewPort(evt.viewport)}
          transitionDurations="200"
          mapStyle={"mapbox://styles/mapbox/streets-v9"}
        >

          {/* WE MAKING PINS */}
          {markers.map(marker => (
            <Marker
              key={marker.id}
              longitude={marker.longitude}
              latitude={marker.latitude}
              offsetLeft={-20}
              offsetTop={-10}
              color={marker.color}
            >
            </Marker>
          ))}

          {popupInfo && (
            <Popup
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              closeButton={true}
              closeOnClick={false}
              onClose={handlePopupClose}
              anchor='left'
            >
              {/* FORM FOR ADDING PINS */}
              <div className="popup-container">
                <h2>Create a Cleanup Event!</h2>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                
                <label>Time:</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

                <label>Location:</label>
                <p>Longitude: {popupInfo.longitude.toFixed(6)} Latitude: {popupInfo.latitude.toFixed(6)}</p>
                <input
                  id="location"
                  type="hidden"
                  value={`(${popupInfo.longitude.toFixed(6)}, ${popupInfo.latitude.toFixed(6)})`}
                />

                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                
                <label>Severity: </label>
                <select value={pinColor} onChange={(e) => setPinColor(e.target.value)}>
                  <option value="">Select severity</option>
                  <option value="yellow">Minor (Yellow)</option>
                  <option value="red">Major (Red)</option>
                </select>
              </div>
              
              <div className="popup-button-container">
                <button onClick={handleAddPin} className="popup-button">Add Pin</button>
              </div>
            </Popup>
          )}

          <NavigationControl position="bottom-right" />
          <FullscreenControl />
          <GeolocateControl />
        </ReactMapGL>
      </div>
    </div>
  );
}
