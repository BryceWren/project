import React, { useEffect, useState } from "react";
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css';
import Axios from "axios";





export const Events = ()=> {
  
   const [date, changeDate] = useState(new Date());
   const [eventdata, setEventData] = useState([]);
   const [locationName, setLocationName] = useState('')

  useEffect(() => {Axios.get('http://localhost:5000/events').then(json => setEventData(json.data)) }, [])

   function changeValue(val) {
      changeDate(val);
   }

   const eventsTable = () => {
      return eventdata.map(ev => {
        return(
          <tr key = {ev.eventid}>
            <td> {ev.locationname}</td>
            <td> {new Date(ev.eventdate).toLocaleDateString()}</td>
            <td> {ev.eventtime}</td>


          </tr>
        )
      })
      
   }


   return (
    <div>
        <NavigationBar />
      <div className="event-container" >
         <Calendar onChange = {changeValue} value = {date} locale="en-US"/> 
         <p>The selected date is - {date.toLocaleDateString()}</p>
         <div className="SettingsDataRetrieval">

         <table className='table'> 
          <thead>
              <tr>
                  <th>locationName</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th />
              </tr>
          </thead>
          
          <tbody>{eventsTable()}</tbody>
      </table>
      </div>
      </div>
    </div>
  );
};

export default Events;
