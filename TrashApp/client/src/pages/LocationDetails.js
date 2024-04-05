import React, { useState, useEffect } from 'react';
import '../Components/CSS/Register.css';
import NavigationBar from '../Components/NavBar';
import Axios from 'axios';
import { useCookies } from 'react-cookie';
import beachImage from '../images/beach.jpg';
import riverImage from '../images/river.jpeg';
import lakeImage from '../images/lake.jpg';
import campgroundImage from '../images/campground.png';
import hikingTrailImage from '../images/hikingtrail.jpg';

const LocationDetails = () => {
  const [cookies, setCookies] = useCookies(['locationname', 'locationid', 'lattitude', 'longitude', 'locationtype', 'severity', 'parking', 'dumpster']);
  const [locationImage, setLocationImage] = useState(null);
  const [parking, setParking] = useState('');
  const [dumpster, setDumpster] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    Axios.get('http://localhost:5000/locationdetails')
      .then(json => setData(json.data))
      .catch(error => console.error('Error fetching location details:', error));
  }, []);

  useEffect(() => {
    // Set locationImage, parking, and dumpster based on the cookie values
    const { locationtype, parking, dumpster } = cookies;
    switch (locationtype) {
      case 'Beach':
        setLocationImage(beachImage);
        break;
      case 'River':
        setLocationImage(riverImage);
        break;
      case 'Lake':
        setLocationImage(lakeImage);
        break;
      case 'Campground':
        setLocationImage(campgroundImage);
        break;
      case 'Hiking Trail':
        setLocationImage(hikingTrailImage);
        break;
      default:
        setLocationImage(null);
        break;
    }
    setParking(parking);
    setDumpster(dumpster);
  }, [cookies]);

  return (
    <div>
      <NavigationBar />
      <div className="auth-form-container">
        <h2>Location Details</h2>
        <form className="register-form">
          {/* Render location image */}
          {locationImage && (
            <img src={locationImage} alt={cookies.locationtype} style={{ maxWidth: '100%', height: 'auto' }} />
          )}
          {/* Display parking details and dumpster location based on cookie values */}
          <div>
            <p>Parking Details: {parking}</p>
            <p>Dumpster Location: {dumpster}</p>
            <p>Events Happening In This Location:</p>
            {/* list  of events happening in this location */}
          </div>
          <div className="button-container"></div>
        </form>
      </div>
    </div>
  );
};

export default LocationDetails;