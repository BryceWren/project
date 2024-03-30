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

  const joinEvent = (event) => {
    console.log('Joining event:', event);
    
  };
  
  const editEvent = (event) => {
    console.log('Edit event:', event);
    
  };

  const postCleanup = (event) => {
    console.log('Post Cleanup', event);
    
  };

  return (
    <div>
      <NavigationBar />
      <div className="event-container">
        <Calendar onChange={changeValue} value={date} locale="en-US" />
        <p>The selected date is - {date.toLocaleDateString()}</p>
    </div>
        <div className="event-details-container">
        {eventData &&
            (eventData.filter(event => {
              const eventDate = new Date(event.eventdate);
              eventDate.setTime(eventDate.getTime() + eventDate.getTimezoneOffset() * 60000);
              const clickedDate = new Date(date);
              clickedDate.setTime(clickedDate.getTime() + clickedDate.getTimezoneOffset() * 60000);
              console.log(eventDate + " " + clickedDate)
              return eventDate.toDateString() === date.toDateString();
            }).length === 0 ? 
              <p>No events going on today!</p>
              :
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
                  <div className="event-details" key={index}>
                    <div className="event-details-left">
                    <h3>Event: {event.locationname}</h3>
                    <p>Date: {event.eventdate}</p>
                    <p>Time: {formatTime(event.eventtime)}</p>
                    <p>Severity: {event.severity}</p>
                    <p>Description: {event.eventdiscription}</p>
                    </div>
                    <div className="event-details-right">
                    <button onClick={() => joinEvent(event)}>Join Event</button>
                    <button onClick={() => editEvent(event)}>Edit Event</button>  {/*HOST VIEW ONLY!!!! */}
                    <button onClick={() => postCleanup(event)}>Post Cleanup</button> {/*HOST VIEW ONLY!!!! */}
                  </div>
                  </div>
                ))
          )}
        
        </div>
    </div>
  );
};

export default Events;
