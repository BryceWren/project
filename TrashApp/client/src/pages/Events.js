import React, {useState} from "react"
import HomePage from "./HomePage"
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css'
//import 'react-calendar/dist/Calendar.css';


export const Events = ()=> {
   const [date, changeDate] = useState(new Date());

   function changeValue(val) {
      changeDate(val);

   }

   return (
    <div>
        <NavigationBar />
      <div className="event-container" >
         <Calendar onChange = {changeValue} value = {date}/>
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