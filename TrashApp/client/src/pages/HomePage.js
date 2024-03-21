import React, { useEffect, useState } from 'react';
import '../Components/CSS/Register.css';
import NavigationBar from '../Components/NavBar';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, FullscreenControl, Popup } from 'react-map-gl';
import { useCookies } from 'react-cookie';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [locationName, setLocationName] = useState('');
  const [locationType, setLocationType] = useState('');

  useEffect(() => {Axios.get('http://localhost:5000/home').then(json => setData(json.data)) }, [])

  const navigate = useNavigate();
  const handleNavigation = (route) => {
    navigate(route);
  };

  /* CLICK FOR PINS */
  const handleClick = ({ lngLat }) => {
    const { lng, lat } = lngLat;
    setPopupInfo({ longitude: lng, latitude: lat });
  }

  const handlePopupClose = () => {
    setPopupInfo(null); // Close the first popup
    setSelectedLocation(null); // Close the second popup
  }

  const handleAddPin = async () => {
    if (popupInfo && (pinColor === "red" || pinColor === "yellow")) {
      setMarkers([...markers, { id: new Date().getTime(), longitude: popupInfo.longitude, latitude: popupInfo.latitude, color: pinColor, date, time, description }]);
      locationdb();
      setPopupInfo(null);
      // Clear input fields after adding pin
      setDate('');
      setTime('');
      setDescription('');
      setPinColor('');
    }
  }

  // Open info popup when clicking on a pin
  const handleMarkerClick = (marker) => {
    setPopupInfo(null); // Close the first popup
    setSelectedLocation(marker);
  }

  const handleDatabaseMarkerClick = (p) => {
    setSelectedLocation(p); // Set selectedLocation to the clicked marker object
    setPopupInfo(null); // Close the first popup
  }

  const mapKey = process.env.REACT_APP_MAPBOX_TOKEN;

  const locationdb = async () => {
    console.log(markers.longitude)
    try {
      const response = await Axios.post("http://localhost:5000/home", {
        backlong: popupInfo.longitude,
        backlat: popupInfo.latitude,
        backName: locationName,
        backType: locationType,
        backSeverity: pinColor
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

          {/* Pins rendered from Database */}
          {data.map(p => (
            <Marker
              key={p.locationid}
              name={p.locationName}
              
              longitude={p.longitude}
              latitude={p.latitude}
              color={p.severity}
              clickTolerance={50}
              onClick={() => handleDatabaseMarkerClick(p)}
            >
            </Marker>
          ))}

          {/* Second Popup */}
          {selectedLocation && (
            <Popup
              longitude={selectedLocation.longitude}
              latitude={selectedLocation.latitude}
              closeButton={true}
              closeOnClick={false}
              onClose={handlePopupClose}
              anchor='right'
            >
              {/* Display information about the selected marker */}
              <div className="popup-container">
                <h3>Location Information</h3>
                <p>Location Name: {selectedLocation.locationname}</p>
                <p>Location Type: {selectedLocation.locationtype}</p>
                <p>Longitude: {selectedLocation.longitude.toFixed(6)}</p>
                <p>Latitude: {selectedLocation.latitude.toFixed(6)}</p>
              </div>

              <div className="popup-button-container">
                <button onClick={() => handleNavigation('/events')} className="popup-button">Join Event</button>
                <button onClick={() => handleNavigation('/cleanupregisterhost')} className="popup-button">Create Event</button>
              </div>
            </Popup>
          )}
          
          {/* First Popup for adding pins */}
          {popupInfo && !selectedLocation && (
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
                <h2>Pin a Cleanup Location!</h2>
                <label>Name of Location:</label>
                <input type={locationName} value={locationName} onChange={(e) => setLocationName(e.target.value)} />
                
                <label>Location Type: </label>
                {/* <input type={locationType} value={locationType} onChange={(e) => setLocationType(e.target.value)} /> */}
                  <select value={locationType} onChange={(e) => setLocationType(e.target.value)}>
                    <option value="">Select type of location</option>
                    <option value="Beach">Beach</option>
                    <option value="River">River</option>
                    <option value="Lake">Lake</option>
                    <option value="Campground">Campground</option>
                    <option value="Hiking Trail">Hiking Trail</option>
                  </select>

                {/* <label>Location:</label>
                <p>Longitude: {popupInfo.longitude.toFixed(6)} Latitude: {popupInfo.latitude.toFixed(6)}</p>
                <input
                  id="location"
                  type="hidden"
                  value={`(${popupInfo.longitude.toFixed(6)}, ${popupInfo.latitude.toFixed(6)})`}
                />

                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} /> */}
                
                <label>Severity: </label>
                <select value={pinColor} onChange={(e) => setPinColor(e.target.value)}>
                  <option value="">Select severity</option>
                  <option value="yellow">Minor (Yellow)</option>
                  <option value="red">Major (Red)</option>
                </select>
              </div>
              
              <div className="popup-button-container">
                <button onClick={handleAddPin} className="popup-button">Add Location</button>
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
