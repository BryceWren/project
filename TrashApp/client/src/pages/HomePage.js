import React, { useEffect, useState } from 'react';
import '../Components/CSS/Register.css';
import NavigationBar from '../Components/NavBar';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, FullscreenControl, Popup } from 'react-map-gl';
import { useCookies } from 'react-cookie';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const [cookies, setCookies] = useCookies(['locationname','locationid','lattitude','longitude','locationtype','severity'])


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
  const [addPinPressed, setAddPinPressed] = useState(false); // State to track if "Add Location" button is pressed

  useEffect(() => {Axios.get('http://localhost:5000/home').then(json => setData(json.data)) }, [])

  const navigate = useNavigate();
  const handleNavigation = (route) => {

    navigate(route);
  };
  const homeCookies = (name,id,long, lat, sever, ltype) => {
    setCookies('locationname', name)
    setCookies('locationid', id)
    setCookies('longitude', long)
    setCookies('latitude', lat)
    setCookies('severity', sever)
    setCookies('locationType', ltype)
    handleNavigation('/cleanupregisterhost')
  }

  /* CLICK FOR PINS */
  const handleClick = ({ lngLat }) => {
    const { lng, lat } = lngLat;
    setPopupInfo({ longitude: lng, latitude: lat });
  }

  const handlePopupClose = () => {
    setPopupInfo(null); // Close the first popup
    setSelectedLocation(null); // Close the second popup
  }

  // const handleAddPin = async () => {
  //   if (popupInfo && (pinColor === "red" || pinColor === "yellow" && locationType === "Beach" || locationType === "River" 
  //       || locationType === "Lake" || locationType === "Campground" || locationType === "Hiking Trail" )) {
  //     setMarkers([...markers, { id: new Date().getTime(), longitude: popupInfo.longitude, latitude: popupInfo.latitude, color: pinColor, date, time, description }]);
  //     locationdb();
  //     setPopupInfo(null);
  //     // Clear input fields after adding pin
  //     setDate('');
  //     setTime('');
  //     setDescription('');
  //     setPinColor('');
  //     setLocationName('');
  //     setLocationType('');
  //   }
  // }

  const handleAddPin = async () => {
    // Set addPinPressed to true when "Add Location" button is pressed
    setAddPinPressed(true);

    // Check if all required fields are filled
    if (
      popupInfo &&
      pinColor &&
      locationType &&
      locationName &&
      (pinColor === "red" || pinColor === "yellow") &&
      (locationType === "Beach" ||
        locationType === "River" ||
        locationType === "Lake" ||
        locationType === "Campground" ||
        locationType === "Hiking Trail")
    ) {
      // Add pin only if validations pass
      setMarkers([
        ...markers,
        {
          id: new Date().getTime(),
          longitude: popupInfo.longitude,
          latitude: popupInfo.latitude,
          color: pinColor,
          date,
          time,
          description,
        },
      ]);
      // Add pin to database
      await locationdb();
      // Reset form fields
      setPopupInfo(null);
      setDate('');
      setTime('');
      setDescription('');
      setPinColor('');
      setLocationName('');
      setLocationType('');
    } else {
      // Show error message or handle validation failure
      console.log("Validation failed. Please fill in all required fields.");
    }
  };
  

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
                <h2>Location Information</h2>
                <p><b>Location Name: </b>{selectedLocation.locationname}</p>
                <p><b>Location Type: </b>{selectedLocation.locationtype}</p>
                <p><b>Longitude: </b>{selectedLocation.longitude.toFixed(6)}</p>
                <p><b>Latitude: </b>{selectedLocation.latitude.toFixed(6)}</p>
                <p><b>LocationID: </b>{selectedLocation.locationid}</p>
              </div>

              <div className="popup-button-container">
                <button onClick={() => 
                homeCookies(selectedLocation.locationname.toString(),selectedLocation.locationid.toString(),selectedLocation.longitude,selectedLocation.latitude,selectedLocation.severity,
                selectedLocation.locationtype)}
                 className="popup-button">Create Event</button>
                <button onClick={() => handleNavigation('/events')} className="popup-button">Join Event</button>
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
                {addPinPressed && !locationName && <p className="popup-validation">Please enter name of location</p>}

                <label>Location Type: </label>
                  <select value={locationType} onChange={(e) => setLocationType(e.target.value)}>
                    <option value="">Select type of location</option>
                    <option value="Beach">Beach</option>
                    <option value="River">River</option>
                    <option value="Lake">Lake</option>
                    <option value="Campground">Campground</option>
                    <option value="Hiking Trail">Hiking Trail</option>
                  </select>
                  {addPinPressed && !locationType && <p className="popup-validation">Please select a type of location</p>}
              
                <label>Severity: </label>
                <select value={pinColor} onChange={(e) => setPinColor(e.target.value)}>
                  <option value="">Select severity</option>
                  <option value="yellow">Minor (Yellow)</option>
                  <option value="red">Major (Red)</option>
                </select>
                {addPinPressed && !pinColor && <p className="popup-validation">Please select a severity</p>}
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
