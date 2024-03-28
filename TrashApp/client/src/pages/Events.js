import React, { useEffect, useState } from "react";
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css';
import Axios from "axios";

export const Events = () => {
  const [date, changeDate] = useState(new Date());
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [date]); // Fetch events whenever the selected date changes

  const fetchEvents = async () => {
    try {
      setEventData(response.data);

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  function changeValue(val) {
    changeDate(val);
  }

  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);
    const formattedDate = `${eventDate.getMonth() + 1}/${eventDate.getDate()}/${eventDate.getFullYear()}`;
    return formattedDate;
  };

  const joinEvent = (event) => {
    // Handle joining the event
    console.log('Joining event:', event);
    
  };

  return (
    <div>
      <NavigationBar />
      <div className="event-container">
        <Calendar onChange={changeValue} value={date} locale="en-US" />
        <p>The selected date is - {date.toLocaleDateString()}</p>
        <div className="SettingsDataRetrieval">
          {eventData &&
            eventData
              .filter(event => {
                const eventDate = new Date(event.eventdate);
                return eventDate.toDateString() === date.toDateString("en-US");
              })
              .map((event, index) => (
                <div key={index}>
                  <h3>Event: {event.locationname}</h3>
                  <p>Date: {formatDate(event.eventdate)}</p>
                  <p>Time: {event.eventtime}</p>
                  <p>Severity: {event.severity}</p>
                  <p>Description: {event.eventdiscription}</p>
                  
                  <button onClick={() => joinEvent(event)}>Join</button>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
