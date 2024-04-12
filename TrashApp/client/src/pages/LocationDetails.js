import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [cookies, setCookies] = useCookies(['locationname', 'locationid', 'latitude', 'longitude', 'locationType', 'severity', 'dumpster', 'parking', 'eventid']);
  const [locationImage, setLocationImage] = useState(null);
  const [events, setEvents] = useState([]);
  const [parking, setParking] = useState('');
  const [dumpster, setDumpster] = useState('');

  useEffect(() => {
    // Fetch events happening in this location
    Axios.get(`http://localhost:5000/events?location=${cookies.locationname}`)
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));

    // Set locationImage based on the cookie values
    switch (cookies.locationType) {
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
    setParking(cookies.parking);
    setDumpster(cookies.dumpster);
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

  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);
            eventDate.setTime(eventDate.getTime() + eventDate.getTimezoneOffset() * 60000);
    return eventDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const navigateToEventDetails = (eventId) => {
    navigate(`/LocationEventDetails/${eventId}`);
  };

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
            <p>Where to park: {cookies.parking}</p>
            <p>Trash Can Location: {cookies.dumpster}</p>
            <p>Events Happening In the Area:</p>
            {/* List of events happening in this location */}
            <div className='location-details-container'>
              {filteredEvents.map(event => (
                <div key={event.id} className="event">
                  <div className="location-details-left">
                    <p>Event: {event.locationname}</p>
                    <p>Date: {formatDate(event.eventdate)}</p>
                  </div>
                  <div className="location-details-right">
                    {/* Navigates to EventDetails associated to the eventID of the location event*/}
                    <button className="form-btn" onClick={() => navigateToEventDetails(event.eventid)}>Event Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationDetails;
