import React, { useEffect, useState } from 'react';
import '../Components/CSS/Register.css';
import NavigationBar from '../Components/NavBar';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, FullscreenControl, Popup } from 'react-map-gl';
import { useCookies } from 'react-cookie';
import Axios from 'axios';

export const HomePage = () => {
  const [cookies] = useCookies(['email', 'firstName'])
  const userEmail = cookies.email;
  const name = cookies.firstName;

  const [viewport, setViewport] = useState({
    latitude: 32.6549967,
    longitude: -79.9406093,
    zoom: 10
  });

  const [markers, setMarkers] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);
  const [pinColor, setPinColor] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null); // Track selected marker for second popup

  useEffect(() => {Axios.get('http://localhost:5000/home').then(json => setData(json.data)) }, [])

  /* CLICK FOR PINS */
  const handleClick = ({ lngLat }) => {
    const { lng, lat } = lngLat;
    setPopupInfo({ longitude: lng, latitude: lat });
  }

  const handlePopupClose = () => {
    setPopupInfo(null); // Close the first popup
    setSelectedMarker(null); // Close the second popup
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
      locationdb(); //this works
    }
  }

  // Open info popup when clicking on a pin
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setPopupInfo(null); // Close the first popup
  }

  const mapKey = process.env.REACT_APP_MAPBOX_TOKEN;

  const locationdb = async () => {
    console.log(markers.longitude)
    try {
      const response = await Axios.post("http://localhost:5000/home", {
        backlong: popupInfo.longitude,
        backlat: popupInfo.latitude,
      });

    } catch (error) {
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
          onMove={evt => setViewport(evt.viewport)}
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
              onClick={() => handleMarkerClick(marker)}
            >
            </Marker>
          ))}
          {data.map(p => (
            <Marker
              key={p.locationid}
              longitude={p.longitude}
              latitude={p.latitude}
              clickTolerance={50}
            >
            </Marker>
          ))}

          {/* Second Popup */}
          {selectedMarker && (
            <Popup
              longitude={selectedMarker.longitude}
              latitude={selectedMarker.latitude}
              closeButton={true}
              closeOnClick={false}
              onClose={handlePopupClose}
              anchor='right'
            >
              {/* Display information about the selected marker */}
              <div>
                <h3>Event Information</h3>
                <p>Date: {selectedMarker.date}</p>
                <p>Time: {selectedMarker.time}</p>
                <p>Description: {selectedMarker.description}</p>
                <p>Longitude: {selectedMarker.longitude.toFixed(6)} Latitude: {selectedMarker.latitude.toFixed(6)}</p>
                <p>Severity: {selectedMarker.color === 'red' ? 'Major' : 'Minor'}</p>
              </div>
            </Popup>
          )}
          
          {/* First Popup for adding pins */}
          {selectedLocation ? (
            <Popup latitude={selectedLocation.p.latitude} longitude={selectedLocation.p.longitude}>
              <div>
                park
              </div>
            </Popup>
          ) : null}
          {popupInfo && !selectedMarker && (
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
