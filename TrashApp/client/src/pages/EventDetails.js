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
import { useNavigate } from "react-router-dom";

const LocationEventDetails = () => {
  const [cookies, setCookies] = useCookies(['locationname', 'locationid', 'lattitude', 'longitude', 'locationType', 'severity', 'eventid', 'firstname']);
  const [locationImage, setLocationImage] = useState(null);
  const [items, setItems] = useState('');
  const [clothing, setClothing] = useState('');
  const [eventData, setEventData] = useState([]);
  const eventId = cookies.eventid;
  const navigate = useNavigate()
  useEffect(() => { fetchEvent(); }, [eventId]); // Make sure to include eventId in the dependency array
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
  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);
            eventDate.setTime(eventDate.getTime() + eventDate.getTimezoneOffset() * 60000);
    return eventDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const formatTime = (timeString) => {
    const eventTime = new Date(`1970-01-01T${timeString}`);
    const formattedTime = eventTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return formattedTime;
  };

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
  const onButtonClick = async () => {
    updateParticipantsList()
    navigate('/home')
  };

  const updateParticipantsList = async () => {
    try {
      const response = await axios.post("http://localhost:5000/LocationEventDetails", {
        backEventID: eventId,
        backFirstName: cookies.firstname
      });
      console.log(response)
      alert(response.data.message)
      //setLoginStatus(response.data); // Assuming that you want to log the response data
    } catch (error) {
      // Handle any errors that might occur during the request
      console.error('An error occurred:', error);
      return false;
    }
  };
  
  const fetchEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/LocationEventDetails/${eventId}`);
      setEventData(response.data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const filteredEvents = eventData.filter(info => info.eventid == eventId)
  console.log(eventId)
  
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
            <div>
              {filteredEvents.map((info, index) => (
                <p key={index}>Date: {formatDate(info.eventdate)}</p>
              ))}
            </div>
            <div>
              {filteredEvents.map((info, index) => (
                <p key={index}>Description of Event: {info.eventdiscription}</p>
              ))}
              </div>
            <div>
              {filteredEvents.map((info, index) => (
                <p key={index}>Time of Event: {formatTime(info.eventtime)}</p>
              ))}
            </div>
              {filteredEvents.map((info, index) => (
                <p key={index}>What to wear: {info.clothing}</p>
              ))}
            </div>
            <div>
              {filteredEvents.map((info, index) => (
                <p key={index}>What to bring: {info.items}</p>
              ))}
            </div>
            <div>
              {filteredEvents.map((info, index) => (
                <p key={index}>
                  <a href="#" onClick={() => getDirections(info.latitude, info.longitude)}>
                    Get Directions to the Event!
                  </a>
                </p>
              ))}
            </div>
          </div>
          <div className="button-container">
            <button onClick={() => onButtonClick()}>Join Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LocationEventDetails;