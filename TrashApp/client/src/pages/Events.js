import React, {useEffect, useState} from "react"
import HomePage from "./HomePage"
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css'
import Axios from "axios";





export const Events = ()=> {
  
   const [date, changeDate] = useState(new Date());
   const [eventData, setEventdata] = useState([]);

  //useEffect(() => {Axios.get('http://localhost:5000/events').then(json => setEventdata(json.data)) }, [])
  useEffect(() => {Axios.get('http://localhost:5000/events').then(json => setEventdata(json.eventData)) }, [])

   function changeValue(val) {
      changeDate(val);

   }
   const AddEvent = async () => {
      try {
        const response = await Axios.post("http://localhost:5000/events", {
          backlong: popupInfo.longitude,
          backlat: popupInfo.latitude,
          backName: locationName,
          backType: locationType,
          backSeverity: pinColor
          
        });
  
  
      } catch (error) {
        console.error('An error ocurred:', error)
      }
    };
   return (
    <div>
        <NavigationBar />
      <div className="event-container" >
         <Calendar onChange = {changeValue} value = {date} locale="en-US"/> 
         <p>The selected date is - {date.toLocaleDateString()}</p>
         <div className="SettingsDataRetrieval">

          <h3>Event1</h3>
          {/* this is where the data from the  database will go  */}
          <h3>Event2</h3>
          {/* this is where the data from the  database will go  */}
          <h3>Event3</h3> 
          {/* this is where the data from the  database will go  */}
      </div>
      </div>
      </div>
   );
}



export default Events;