import React, { useEffect, useState } from "react";
import HomePage from "../pages/HomePage";
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const IndividualCleanup = () => {
  const [cookies] = useCookies(['lastname', 'firstname', 'locationname', 'ishost', 'locationid']);
  const [eventData, setData] = useState([]);
  const [changedSeverity, setChangedSeverity] = useState('');
  const [message, setMessage] = useState("");
  const [timerActive, setTimerActive] = useState(false); // State to track if timer is active

  const firstName = cookies.firstname;
  const lastName = cookies.lastname;
  const locationName = cookies.locationname;
  const test = 'this is wrong and is not getting description from the database please fix';
  const navigate = useNavigate();


  const updateMarkerColorRequest = async () => {
    try {
      const response = await Axios.put("http://localhost:5000/IndividualCleanup", {
        backlocationid: cookies.locationid,
        changedcolor: changedSeverity
      });
      console.log(changedSeverity);
      console.log(response);
      //setLoginStatus(response.data); // Assuming that you want to log the response data
    } catch (error) {
      // Handle any errors that might occur during the request
      console.error('An error occurred:', error);
      return false;
    }
  };

  const submitButton = () => {
    updateMarkerColorRequest();
    setMessage("Form submitted. Redirecting to home page...");
    setTimeout(() => {
      navigate('/home');
    }, 2000); // Wait for 2 seconds before redirecting
    setTimerActive(true); // Start the timer
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
    const period = hour >= 12 ? 'PM' : 'AM'; // Determine if it's AM or PM
    const hour12 = hour % 12 || 12; // Convert hour to 12-hour format
    return `${hour12}:${min} ${period}`;
  }
  

  function getMembership() {
    const membership = cookies.ishost;
    if (membership) {
      return ('H');
    } else {
      return ("V");
    }
  }

  return (
    <div>
      <NavigationBar />
      <div className="auth-form-container">
        <h1>Report Cleanup</h1>
        <div className="register-form">
          {/* This is where we would put the  picture if we  actually implement it */}
          <p><b>Name: </b>{firstName + " "}{lastName} {getMembership()}</p>
          <p><b>Date: </b>{getDate()}</p>
          <p><b>Time: </b>{getTime()}</p>
          <p><b>Location: </b>{locationName}</p>
          <p><b>What did you clean?</b></p>
          <input />
          
          
          <p><b>How clean is {locationName}? </b> </p>
          <select value={changedSeverity} onChange={(e) => setChangedSeverity(e.target.value)}>
            <option value="">Select severity</option>
            <option value="green">Spotless (Green)</option>
            <option value="yellow">A Little Trash (Yellow)</option>
            <option value="red">Still A Lot of Trash Is Left (Red)</option>
          </select>
        </div>
        <div className="popup-button">
          <button onClick={submitButton}> Submit Form </button>
        </div>
        {message && <div>{message}</div>}
      </div>
    </div>
  );
};

export default IndividualCleanup;