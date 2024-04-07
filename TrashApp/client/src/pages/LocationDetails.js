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
import { format, parseISO, isBefore, isAfter, isEqual, isSameDay } from 'date-fns';

const LocationDetails = () => {
  const [cookies, setCookies] = useCookies(['locationname', 'locationid', 'lattitude', 'longitude', 'locationType', 'severity', 'parking', 'dumpster']);
  const [locationImage, setLocationImage] = useState(null);
  const [parking, setParking] = useState('');
  const [dumpster, setDumpster] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:5000/locationdetails')
      .then(json => setData(json.data))
      .catch(error => console.error('Error fetching location details:', error));
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
    setParking(parking);
    setDumpster(dumpster);

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
    return newDate;
  }




  // Filter events based on matching location names
 
  const filteredEvents = events.filter(event => event.locationname === cookies.locationname && (isAfter(event.eventdate,getDate()) || isSameDay(parseISO(event.eventdate),getDate())));
  return (
    <div>
      <NavigationBar />
      <div className="auth-form-container">
        <h2>Location Details</h2>
        <form className="register-form">
          {/* Render location image */}
          {locationImage && (
            <img src={locationImage} alt={cookies.locationType} style={{ maxWidth: '100%', height: 'auto' }} />
          )}
          {/* Display parking details and dumpster location based on cookie values */}
          <div>
            <p>Location Name: {cookies.locationname}</p>
            <p>Location Type: {cookies.locationType}</p>
            <p>Parking Details: {cookies.parking}</p>
            <p>Dumpster Location: {cookies.dumpster}</p>
            <p>Events Happening In <b>{cookies.locationname}</b></p>
            {/* List of events happening in this location */}
            <ul>
              {filteredEvents.map(event => (
                <li key={event.id}>
                  <p>Event: {event.locationname}</p>
                  <p>Date: {event.eventdate}</p>
                  <button>Join Event</button>
                </li>
                
              ))}
            </ul>
          </div>
          <div className="button-container"></div>
        </form>
      </div>
    </div>
  );
};

export default LocationDetails;
