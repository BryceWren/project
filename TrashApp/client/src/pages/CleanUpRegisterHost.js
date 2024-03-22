import React, {useState, useEffect} from "react"
import HomePage from "./HomePage"
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css';
import Axios from 'axios'
import { useCookies } from 'react-cookie'

const CleanUpRegister = () => {
  const [Date, setDate] = useState('');
  const [Time, setTime] = useState('');
  const [Description, setDescription] = useState('');
  const [Location, setLocation] = useState('');
  const [setEventdata, Eventdata] = useState([]);
  const [cookies, setCookies] = useCookies(['locationname'])

  //useEffect(() => {Axios.get('http://localhost:5000/events').then(json => setEventdata(json.data)) }, [])
  
  const mapToLocationName = cookies.locationname;

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (Date && Time && Location) {
      alert('Post Successful');
    } else {
      alert('Please fill out the  three Required fields');
    }
  };

  const handleDateChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    // Optionally, you can add some formatting to the input
    const formattedInput = input.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); // Format as MM/DD/YYYY
    setDate(formattedInput);
  };
 

  return (
    <div className="auth-form-container">
      <h1>Create A Post</h1>
      <form className ="register-form">
        {/* this is where the picture will be */}
     {/*    this is the date */}
          <label htmlFor="Date">Date: * Required Field</label>
          <input
          value={Date}
          onChange={handleDateChange}
          type="text" // Use type="text" to allow custom formatting
          name="Date"
          id="Date"
          placeholder="--/--/----"
        />
{/*          this is the time */}
        <label htmlFor="Time">Time: * Required Field</label>
        <input
          value={Time}
          onChange={(e) => setTime(e.target.value)}
          name="Time"
          id="Time"
          placeholder="3:30"
        />
        {/*  this is the  Desciption, i did not make this required */}
        <label htmlFor="Description"> Description:</label>
        <textarea value={Description} onChange={handleChange} />
     {/*     this is the  location  */}
        <label >Location: {mapToLocationName}  </label>
        

 {/*  <div className="Buttons" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
  <input type="radio" id="Minor" name="Severity" value="Minor" />
  <label htmlFor="Minor">Minor</label>
  <input type="radio" id="Major" name="Severity" value="Major" />
  <label htmlFor="Major">Major</label>
</div> */}
<select name="Severity" id="Severity">
<option value="None">None</option>
<option value="volvo">Good</option>
<option value="saab">Dirty</option>
<option value="mercedes">Extreme</option>
</select>

        
       <div className="button-container">
          <button className="form-btn" onClick={handleUpdate}>
            Edit
          </button>
          <button className="form-btn" onClick={handleUpdate}>
            Done
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default CleanUpRegister;
