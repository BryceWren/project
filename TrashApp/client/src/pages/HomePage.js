import React, { useEffect, useState } from 'react';
import '../Components/CSS/Register.css';
import NavigationBar from '../Components/NavBar';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, FullscreenControl, Popup } from 'react-map-gl';
import { useCookies } from 'react-cookie';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const [cookies, setCookies] = useCookies(['locationname','locationid','lattitude','longitude','locationtype','severity', 'parking', 'dumpster','userLatitude', 'userLongitude'])


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
  const [parking, setParking] = useState('');
  const [dumpster, setDumpster] = useState('');

  useEffect(() => {Axios.get('http://localhost:5000/home').then(json => setData(json.data)) }, [])

  const navigate = useNavigate();
  const handleNavigation = (route) => {

    navigate(route);
  };
  const homeCookies = (name,id,long, lat, sever, ltype, park, dump) => {
    setCookies('locationname', name)
    setCookies('locationid', id)
    setCookies('longitude', long)
    setCookies('latitude', lat)
    setCookies('severity', sever)
    setCookies('locationType', ltype)
    handleNavigation('/cleanupregisterhost')
    setCookies( "parking", park)
    setCookies("dumpster", dump)
  }
  const individualCookies = (name,id,long, lat, sever, ltype) => {
    setCookies('locationname', name)
    setCookies('locationid', id)
    setCookies('longitude', long)
    setCookies('latitude', lat)
    setCookies('severity', sever)
    setCookies('locationType', ltype)
    handleNavigation('/IndividualCleanup')
    //DO WE NEED INDIVIDUAL COOKIES FOR PARKING AND DUMPSTER LOCATIONS
  }
  const locationDetailsCookies = (name,id,long, lat, sever, ltype, park, dump) => {
    setCookies('locationname', name)
    setCookies('locationid', id)
    setCookies('longitude', long)
    setCookies('latitude', lat)
    setCookies('severity', sever)
    setCookies('locationType', ltype)
    setCookies( "parking", park)
    setCookies("dumpster", dump)
    handleNavigation('/locationdetails')
  }
  /* CLICK FOR PINS */
  const handleClick = ({ lngLat }) => {
    const { lng, lat } = lngLat;
    setPopupInfo({ longitude: lng, latitude: lat });
  
    // Update the viewport to the clicked location
    setViewport({
      latitude: lat,
      longitude: lng,
      zoom: 10, // Set the desired zoom level
    });
  };

  const handlePopupClose = () => {
    setPopupInfo(null); // Close the first popup
    setSelectedLocation(null); // Close the second popup
  }


  const handleAddPin = async () => {
    // Set addPinPressed to true when "Add Location" button is pressed
    setAddPinPressed(true);
    window.location.reload();

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
        locationType === "Hiking Trail") &&
        parking &&
        dumpster
        
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
          locationname: locationName,
          locationtype: locationType,
          parking,
          dumpster
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
      setParking('');
      setDumpster('');
    } else {
      // Show error message or handle validation failure
      console.log("Validation failed. Please fill in all required fields.");
    }
  };
  

  // Open info popup when clicking on a pin
  const handleMarkerClick = (marker) => {
    setPopupInfo(null); // Close the first popup
    setSelectedLocation(marker);
    setViewport({
      latitude: p.latitude,
      longitude: p.longitude,
      zoom: 10, // Set the desired zoom level
    });
  }

  const handleDatabaseMarkerClick = (p) => {
    setSelectedLocation(p); // Set selectedLocation to the clicked marker object
    setPopupInfo(null); // Close the first popup
    setViewport({
      latitude: p.latitude,
      longitude: p.longitude,
      zoom: 10, // Set the desired zoom level
    });
  }

  const mapKey = process.env.REACT_APP_MAPBOX_TOKEN;

  const locationdb = async () => {
    try {
      const response = await Axios.post("http://localhost:5000/home", {
        backlong: popupInfo.longitude,
        backlat: popupInfo.latitude,
        backName: locationName,
        backType: locationType,
        backSeverity: pinColor,
        backParking: parking,
        backDumpster: dumpster
      });
      console.log(response)

    } catch (error) {
      console.error('An error ocurred:', error)
    }
  };

  return (
    <div>
      <NavigationBar />
      <div style={{ width: "100vw", height: "94vh", alignContent: "center" }}>
        <ReactMapGL
          onClick={handleClick}
          width="100%"
          height="100%"
          mapboxAccessToken={mapKey}
          {...viewport}
          onMove={evt => setViewport(evt.viewport)}
          transitionDurations= "200"
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
              dumpster={p.dumpster}
              parking={p.parking}
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
                <div>
                <a className="link-btn" onClick={() => locationDetailsCookies(selectedLocation.locationname,selectedLocation.locationid,selectedLocation.longitude,selectedLocation.latitude,selectedLocation.severity,
                selectedLocation.locationtype, selectedLocation.parking, selectedLocation.dumpster)}>View Location Details</a>
                </div>
                
              </div>

              <div className="popup-button-container">
                <button onClick={() => 
                homeCookies(selectedLocation.locationname,selectedLocation.locationid,selectedLocation.longitude,selectedLocation.latitude,selectedLocation.severity,
                selectedLocation.locationtype, selectedLocation.parking, selectedLocation.dumpster)}
                 className="popup-button">Create Event</button>
                <button onClick={() => individualCookies(selectedLocation.locationname,selectedLocation.locationid,selectedLocation.longitude,selectedLocation.latitude,selectedLocation.severity,
                selectedLocation.locationtype, selectedLocation.parking, selectedLocation.dumpster)} className="popup-button">Individual Cleanup</button>
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

                <label>Parking Details: </label>
                <input type={parking} value={parking} onChange={(e) => setParking(e.target.value)} />
                {addPinPressed && !parking && <p className="popup-validation">Please enter parking details</p>}

                <label>Dumpster Location: </label>
                <input type={dumpster} value={dumpster} onChange={(e) => setDumpster(e.target.value)} />
                {addPinPressed && !dumpster && <p className="popup-validation">Please enter dumpster location</p>}

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
