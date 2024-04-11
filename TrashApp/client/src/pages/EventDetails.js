import React, { useState, useEffect } from 'react';
import '../Components/CSS/Register.css';
import NavigationBar from '../Components/NavBar';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import beachImage from '../images/beach.jpg';
import riverImage from '../images/river.jpeg';
import lakeImage from '../images/lake.jpg';
import campgroundImage from '../images/campground.png';
import hikingTrailImage from '../images/hikingtrail.jpg';

const EventDetails = () => {
  const [cookies, setCookies] = useCookies(['locationname', 'locationid', 'lattitude', 'longitude', 'locationType', 'severity', 'eventid']);
  const [locationImage, setLocationImage] = useState(null);
  const [items, setItems] = useState('');
  const [clothing, setClothing] = useState('');
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    // Set locationImage, parking, and dumpster based on the cookie values
    const { locationType, parking, dumpster } = cookies;
    switch (locationType) {
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
  }, [cookies]);

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const newDate = `${year}-${month}-${date}`;
    console.log(eventData);
    return newDate;
  }

  function getDirections(coordinatesX, coordinatesY) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          const url = `https://www.google.com.sa/maps/dir/${userLatitude},${userLongitude}/${coordinatesX},${coordinatesY}`;
          window.open(url, '_blank');
        },
        (error) => {
          console.error('Error getting user location:', error);
          const url = `https://www.google.com.sa/maps/dir/current_location/${coordinatesX},${coordinatesY}`;
          window.open(url, '_blank');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  const fetchEvent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/EventDetails', {
        backEventIdentification: cookies.eventid,
      });
      setEventData(response.data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="auth-form-container">
        <h2>Event Details</h2>
        <form className="register-form">
          {/* Render location image */}
          {locationImage && (
            <img src={locationImage} alt={cookies.locationType} style={{ maxWidth: '100%', height: 'auto' }} />
          )}
          {/* Display parking details and dumpster location based on cookie values */}
          <div>
            <p>Location Name: {cookies.locationname}</p>
            <p>Location Type: {cookies.locationType}</p>
            <div>
              {eventData.map((info, index) => (
                <p key={index}>What to wear: {info.clothing}</p>
              ))}
            </div>
            <div>
              {eventData.map((info, index) => (
                <p key={index}>What to bring: {info.items}</p>
              ))}
            </div>
            <div>
              {eventData.map((info, index) => (
                <p key={index}>
                  <a href="#" onClick={() => getDirections(info.latitude, info.longitude)}>
                    Get Directions to the Event!
                  </a>
                </p>
              ))}
            </div>
          </div>
          <div className="button-container">
            <button>Join Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventDetails;