import React, { useEffect, useState } from "react";
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const Events = () => {
  const [cookies] = useCookies(['lastname', 'firstname', 'email'])
  const [date, changeDate] = useState(new Date());
  const [eventData, setEventData] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [date]); // Fetch events whenever the selected date changes

  const fetchEvents = async () => { 
    try {
      const response = await Axios.get("http://localhost:5000/events");
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

  //get eventID of specific event, then post 
  
 /* const getEventID = (event) => {
    const eventID = event.eventid
    return eventID;
  }*/

  /* const joinEvent = async (event) => {
    try {
      const response = await Axios.post("http://localhost:5000/events", {
          backEventID: getEventID(event),
          backEmail: cookies.email,
      });
  } catch (error) {
      console.error('An error occurred:', error);
  }
  console.log(event.eventID);
  }*/
  const joinEvent = async (event) => {
      try {
        const eventID = await event.eventid
        console.log(eventID)
        console.log(cookies.email)
        const response = await Axios.post("http://localhost:5000/events", {
          backEventID: eventID,
          backEmail: cookies.email
        });
      }catch (error) {
        console.error('An error occurred:', error);
      }
  }
         //THIS NEEDS TO HAVE SOME SORT OF COUNTER ON THE BACKEND ALONGSIDE USER CREDENTIALS
  
  const editEvent = (event) => {
    console.log('Edit event:', event); //ONLY THE USER THAT CREATED THIS EVENT CAN MANIPULATED THE EVENT THEY CREATED... MAKE USERID POST TO THE DB TO SAVE WHICH USER DID WHAT ON EVENTS
  };

  const postCleanup = (event) => {
    navigate('/postUI') // WILL NEED TO CHANGE THIS TO A DIFFERENT PAGE FOR CLEANUP GROUPS I JUST DID THIS TO TEST
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
                return eventDate.toDateString() === date.toDateString();
              })
              .map((event, index) => (
                <div className="event-details" key={index}>
                  <div className="event-details-left">
                    <h3>Event: {event.locationname}</h3>
                    <p>Date: {event.eventdate}</p>
                    <p>Time: {formatTime(event.eventtime)}</p>
                    <p>Severity: {event.severity === 'red' ? 'Major' : 'Minor'}</p>
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
