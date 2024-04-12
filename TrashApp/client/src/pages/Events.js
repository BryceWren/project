import React, { useEffect, useState } from "react";
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const Events = () => {
  const [cookies] = useCookies(['lastname', 'firstname', 'email']);
  const[,setCookie] = useCookies(['eventid','locationname','severity','locationid', 'locationType', 'eventid'])
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

 /* const joinEvent = async (event) => {
      try {
        const eventID = await event.eventid
        const response = await Axios.post("http://localhost:5000/events", {
          backEventID: eventID,
          backFirstName: cookies.firstname
        });
      }catch (error) {
        console.error('An error occurred:', error);
      }
  }*/
  
  const joinEvent = (event) => {
    const eventID = event.eventid;
    
    Axios.post("http://localhost:5000/events", {
      backEventID: eventID,
      backFirstName: cookies.firstname
    })
    .then((response) => {
      alert(response.data.message);
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
  };
         //THIS NEEDS TO HAVE SOME SORT OF COUNTER ON THE BACKEND ALONGSIDE USER CREDENTIALS
  
  const eventInfo = (event) => {
    setCookie('eventid', event.eventid)
    setCookie('locationname', event.locationname)
    setCookie('severity', event.severity)
    setCookie('locationid', event.locationid)
    setCookie('locationType', event.locationtype)
    navigate('/EventDetails'); 
  };

  const postCleanup = (event) => { 
    console.log(event.eventid)
      setCookie('eventid', event.eventid)
      setCookie('locationname', event.locationname)
      setCookie('severity', event.severity)
      setCookie('locationid', event.locationid)
      setCookie('locationType', event.locationtype)
      navigate('/postUI') 
      console.log('Post Cleanup', event);
  };

  return (
    <div>
      <NavigationBar />
      <div className="event-container">
        <Calendar onChange={changeValue} value={date} locale="en-US" />
        <p>The selected date is - {date.toLocaleDateString()}</p>
      {/* </div> */}
      <div className="event-details-container">
        {eventData &&
          (eventData.filter(event => {
            const eventDate = new Date(event.eventdate);
            eventDate.setTime(eventDate.getTime() + eventDate.getTimezoneOffset() * 60000);
            const clickedDate = new Date(date);
            clickedDate.setTime(clickedDate.getTime() + clickedDate.getTimezoneOffset() * 60000);
            return eventDate.toDateString() === date.toDateString();
          }).length === 0 ? 
            <p>No events going on this day!</p>
            :
            eventData
              .filter(event => {
                const eventDate = new Date(event.eventdate);
                eventDate.setTime(eventDate.getTime() + eventDate.getTimezoneOffset() * 60000);
                const clickedDate = new Date(date);
                clickedDate.setTime(clickedDate.getTime() + clickedDate.getTimezoneOffset() * 60000);
                return eventDate.toDateString() === date.toDateString();
              })
              .sort((a, b) => new Date(`1970-01-01T${a.eventtime}`) - new Date(`1970-01-01T${b.eventtime}`)) // Sort by event time in ascending order
              .map((event, index) => (
                <div className="event-details" key={index}>
                  <div className="event-details-left">
                    <h3>Event: {event.locationname}</h3>
                    {/* <p>Date: {event.eventdate}</p> */}
                    <p>Time: {formatTime(event.eventtime)}</p>
                    <p>Severity: {event.severity === 'red' ? 'Major' : 'Minor'}</p>
                    <p>Description: {event.eventdiscription}</p>
                    
                  </div>
                  <div className="event-details-right">
                    <button onClick={() => joinEvent(event)}>Join Event</button>
                    <button onClick={() => eventInfo(event)}>Event Info</button>  {/*HOST VIEW ONLY!!!! */}
                    <button onClick={() => postCleanup(event)}>Report Cleanup</button> {/*HOST VIEW ONLY!!!! */}
                  </div>
                </div>
              ))
          )}
      </div>
    </div>
    </div>
  );
};

export default Events;
