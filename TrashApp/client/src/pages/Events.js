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
      const response = await Axios.get("http://localhost:5000/events");
      setEventData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  function changeValue(val) {
    changeDate(val);
  }

  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);
    const formattedDate = `${eventDate.getMonth()}/${eventDate.getDate()}/${eventDate.getFullYear()}`;
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
                eventDate.setTime(eventDate.getTime() + eventDate.getTimezoneOffset() * 60000);
                const clickedDate = new Date(date);
                clickedDate.setTime(clickedDate.getTime() + clickedDate.getTimezoneOffset() * 60000);
                console.log(eventDate + " " + clickedDate)
                return eventDate.toDateString() === date.toDateString();
              })
              .map((event, index) => (
                <div key={index}>
                  <h3>Event: {event.locationname}</h3>
                  <p>Date: {event.eventdate}</p>
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
