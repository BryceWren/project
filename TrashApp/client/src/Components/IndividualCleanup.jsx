import React, {useEffect, useState} from "react"
import HomePage from "../pages/HomePage"
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const individualcleanup = () => {
const [cookies] = useCookies(['lastname', 'firstname', 'locationname', 'ishost']);
const [eventData, setData] = useState([]);

const firstName = cookies.firstname
const lastName = cookies.lastname
const locationName = cookies.locationname
const test = 'this is wrong and is not getting description from the database please fix'
const navigate = useNavigate();



const submitButton = () => {
    ""//THIS IS WHERE YOU ADD THE .PATCH/.UPDATE WHEN THEY SUBMIT TO UPDATE SEVERITY AND OTHER INFO
  navigate('/home')
}

function getDate()  {
  const today = new Date()
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  
  return `${month}/${date}/${year}`;
  }

  function getTime()  {
    const time = new Date()
    const hour = time.getHours();
    const min = time.getMinutes(); //GOTTA GET AM OR PM
    return `${hour}:${min}`;
    }

  function getMembership() {
    const membership = cookies.ishost;
    if (membership){
      return ('H')
    }
    else{
      return ("V")
    }
  }
   return (
    <div>
    <NavigationBar />
     <div className="auth-form-container">
      <h1>Posted Cleanup</h1>
      <div className="register-form">
     {/* This is where we would put the  picture if we  actually implement it */}
     <h5>Participants: </h5>{firstName +" "}{lastName} {getMembership()}
      <h5>Date:</h5>
      {getDate()}
      <h5>Time:</h5>
      {getTime()}
     <h5>What did you clean?:</h5>
     <input/>
     <h5>Location:</h5>
     {locationName}
     <label>How clean is {locationName}? </label>
     <select >
                  <option value="">Select severity</option>
                  <option value="yellow">Spotless (Green)</option>
                  <option value="yellow">A little Trash (Yellow)</option>
                  <option value="red">a lot of Trash is left (Red)</option>
                  </select >
    </div>
    <div className="popup-button">
    <button onClick={submitButton}> Submit Form </button>
    </div>
   
    </div>
    </div>
   )
 }
export default individualcleanup;
