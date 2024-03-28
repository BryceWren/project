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
      const response = await Axios.get("http://localhost:5000/events", {
        params: { date: date.toISOString() } // Send the selected date in ISO format
      });
      setEventData(response.data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  function changeValue(val) {
    changeDate(val);
  }

  const joinEvent = (event) => {
    // Handle joining the event
    console.log('Joining event:', event);
    // Add any additional logic for joining the event, e.g., updating the database, showing a confirmation message, etc.
  };

  return (
    <div>
      <NavigationBar />
      <div className="event-container">
        <Calendar onChange={changeValue} value={date} locale="en-US" />
        <p>The selected date is - {date.toLocaleDateString()}</p>
        <div className="event-details">
          {eventData && eventData.map((event) => {
            if (new Date(event.eventdate).toLocaleDateString() === date.toLocaleDateString()) {
              return (
                <div>
                  <h3>Event: {event.locationname}</h3>
                  <p>Date: {event.eventdate}</p>
                  <p>Time: {event.eventtime}</p>
                  <p>Location: ({event.longitude.toFixed(6)}, {event.latitude.toFixed(6)})</p>
                  <p>Severity: {event.severity}</p>
                  <p>Description: {event.eventdiscription}</p>

                  <button onClick={() => joinEvent(event)}>Join</button>
                </div>
              );
            } else {
              return null; // If event date doesn't match the selected date, don't render it
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;