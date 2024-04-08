import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const PostUI = () => {
  const [cookies] = useCookies(['lastname', 'firstname', 'locationname', 'ishost', 'email', 'eventid','severity','locationid']);
  const [changedSeverity, setChangedSeverity] = useState('');
  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getParticipants();
  }, []);

  const updateMarkerColorRequest = async () => {
    try {
      const response = await Axios.put("http://localhost:5000/postUI", {
        backlocid: cookies.locationid,
        backcolor: changedSeverity
      });
      console.log(changedSeverity);
      console.log(response);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const getParticipants = async () => {
    try {
      const eventID = cookies.eventid;
      const response = await Axios.post("http://localhost:5000/postUI", {
        backEventID: eventID
      });
      setParticipants(response.data);
    } catch (error) {
      console.error('An error has occurred:', error); 
    }
  };

  const submitButton = () => {
    updateMarkerColorRequest();
    setMessage("Form submitted. Redirecting to home page...");
    setTimeout(() => {
      navigate('/home');
    }, 2000); // Wait for 2 seconds before redirecting
  };

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  function getTime() {
    const time = new Date();
    const hour = time.getHours();
    const min = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
    const timeString = `${hour}:${min}`;
    const eventTime = new Date(`1970-01-01T${timeString}`);
    const formattedTime = eventTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return timeString;
  }

  function getMembership() {
    const membership = cookies.ishost;
    return membership ? 'H' : 'V';
  }

  return (
    <div>
      <NavigationBar />
      <div className="auth-form-container">
        <h1>Posted Cleanup</h1>
        <div className="register-form">
          <h5>Participants: 
            <ul>
              {participants.map((participant, index) => (
                <li key={index}>{participant.firstname}</li>
              ))}
            </ul>
          </h5> 
          <h5>Date:</h5>
          {getDate()}
          <h5>Time:</h5>
          {getTime()}
          <h5>Any comments?:<input/></h5>
          <label>How clean is: {cookies.locationname}</label>
          <select value={changedSeverity} onChange={(e) => setChangedSeverity(e.target.value)}>
            <option value="">Select severity</option>
            <option value="green">Spotless (Green)</option>
            <option value="yellow">A little Trash (Yellow)</option>
            <option value="red">a lot of Trash is left (Red)</option>
          </select>
        </div>
        <div className="popup-button">
          <button onClick={submitButton}>Submit Form</button>
        </div>
        {message && <div>{message}</div>}
      </div>
    </div>
  );
};
 
export default PostUI;