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

const EventDetails = () => {
  const [cookies, setCookies] = useCookies(['locationname', 'locationid', 'lattitude', 'longitude', 'locationType', 'severity']);
  const [locationImage, setLocationImage] = useState(null);
  const [items, setItems] = useState('');
  const [clothing, setClothing] = useState('');
  const [events, setEvents] = useState([]);
  const [event, setEventData] = useState([])

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => { 
    try {
      const response = await Axios.get("http://localhost:5000/EventDetails");
      setEventData(response.data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
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


    // Fetch events happening in this location
    Axios.get(`http://localhost:5000/events?location=${cookies.locationname}`)
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, [cookies]);
  
  function getDate()  {
    const today = new Date()
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const date = today.getDate();
    const newDate =  `${year}-${month}-${date}`;
    console.log(events)
    return newDate;
  }




  // Filter events based on matching location names
 
 
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
            <p>What we will be providing: {}</p>
            <p>What to wear: {}</p>
            <p>Events Happening In <b>{cookies.locationname}</b></p>
            {/* List of events happening in this location */}
          </div>
          <div className="button-container"><button>Join Event</button></div>
        </form>
      </div>
    </div>
  );
};

export default EventDetails;
