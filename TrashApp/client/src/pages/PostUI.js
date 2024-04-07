import React, {useEffect, useState} from "react"
import HomePage from "./HomePage"
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const PostUI = () => {
const [cookies] = useCookies(['lastname', 'firstname', 'locationname', 'ishost', 'email', 'eventid','severity']);
const [eventData, setData] = useState(null);
const [discriptor, setDescription] = useState('')
const [changedSeverity, setChangedSeverity] = useState('')

const firstName = cookies.firstname
const lastName = cookies.lastname
const locationName = cookies.locationname
const navigate = useNavigate();
const prevSeverity = cookies.severity
useEffect(() => {
  Axios.post('http://localhost:5000/postUI')
    .then(response => {
      setData(response.data);
      
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);
const updateMarkerColorRequest = async () => {
  try {
      const response = await Axios.put("http://localhost:5000/postUI", {
          backlocationid: cookies.locationid,
          changedcolor: changedSeverity
      });
      console.log(changedSeverity)
      console.log(response)
      //setLoginStatus(response.data); // Assuming that you want to log the response data
  } catch (error) {
      // Handle any errors that might occur during the request
      console.error('An error occurred:', error);
      return false;
  }
};

const submitButton = () => {

    updateMarkerColorRequest();
    
    //THIS IS WHERE YOU ADD THE .PATCH/.UPDATE WHEN THEY SUBMIT TO UPDATE SEVERITY AND OTHER INFO
    //Axios.put( `http://localhost:5000/IndividualCleanup/${cookies.locationid}`,{changedSeverity} ) //this doesn't work needs more testing

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
    const min = (time.getMinutes() < 10 ? '0' : + '') + time.getMinutes(); //GOTTA GET AM OR PM
    const timeString =  `${hour}:${min}`;
    const eventTime = new Date(`1970-01-01T${timeString}`);
    const formattedTime = eventTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return formattedTime;
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
      <h5>Description:</h5>
      {}
     <label>How clean is: {locationName} </label>
     <select value={changedSeverity} onChange={(e) => setChangedSeverity(e.target.value)}>
                  <option value="">Select severity</option>
                  <option value="green">Spotless (Green)</option>
                  <option value="yellow">A little Trash (Yellow)</option>
                  <option value="red">a lot of Trash is left (Red)</option>
                  </select >
    </div>
    <div className="popup-button">
    <button onClick={submitButton()}> Submit Form </button>
    </div>
   
    </div>
    </div>
   )
 }
 
 export default PostUI;


