import React, {useState} from "react"
import HomePage from "./HomePage"
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css';

const CleanUpRegister = () => {
  const [Date, setDate] = useState('');
  const [Time, setTime] = useState('');
  const [Description, setDescription] = useState('');
  const [Location, setLocation] = useState('');
  const [Severity, setSeverity] = useState('');

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
  const handleSeverityChange = (severity) => {
    setSeverity(severity);
  };

 

  return (
    <div className="auth-form-container">
      <h1>Create A Post</h1>
      <form classname ="PostUI-form">
        {/* this is where the picture will be */}
     {/*    this is the date */}
        <label htmlFor="Date">Date: * Required Field</label>
        <input
          value={Date}
          onChange={(e) => setDate(e.target.value)}
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
        <label htmlFor="Location">Location: * Required Field  </label>
        <input
          value={Location}
          onChange={(e) => setLocation(e.target.value)}
          name="Location"
          id="Location"
          placeholder="124 congress road"
        />
       

        <button className="form-btn" onClick={handleUpdate}>
          Edit
        </button>
        <button className="form-btn" onClick={handleUpdate}>
          Done
        </button>
      </form>
    </div>
  );
};

export default CleanUpRegister;
