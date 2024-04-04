import React, {useState} from "react"
import HomePage from "./HomePage"
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const PostUI = () => {
const [cookies] = useCookies(['lastname', 'firstname', 'locationname']);


const firstName = cookies.firstname
const lastName = cookies.lastname
const locationName = cookies.locationname
const navigate = useNavigate();


const submitButton = () => {
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

   return (
    <div>
    <NavigationBar />
     <div className="auth-form-container">
      <h1>Posted Cleanup</h1>
      <div className="register-form">
     {/* This is where we would put the  picture if we  actually implement it */}
     <h5>Participants: </h5>{firstName +" "}{lastName}
      <h5>Date:</h5>
      {getDate()}
      <h5>Time:</h5>
      {getTime()}
     <h5>Description:</h5>
     {/* information from  the database will go here */}
     <h5>Location:</h5>
     {locationName}
    </div>
    <div className="popup-button">
    <button onClick={submitButton}> Submit Form </button>
    </div>
   
    </div>
    </div>
   )
 }
 
 export default PostUI;


