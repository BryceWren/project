import React, { useState } from "react";
import NavigationBar from "../Components/NavBar";
import Axios from "axios";
import { useCookies } from "react-cookie";

const CleanUpRegister = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [cookies] = useCookies(["locationname", "longitude", "latitude", "severity","locationType","locationid"]);
  const [longitude, setLongitude] = useState(cookies.longitude || 0);
  const [latitude, setLatitude] = useState(cookies.latitude || 0);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    const formattedInput = input.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    setDate(formattedInput);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (date && time && description) {
      eventregister();
      alert("Post Successful");
    } else {
      alert("Please fill out the three Required fields");
    }
  };

  const eventregister = async () => {
    try {
      const response = await Axios.post("http://localhost:5000/cleanupregisterhost", {
        backDesc: description,
        backDate: date,
        backTime: time,
        backlat: cookies.latitude,
        backlong: cookies.longitude,
        backName: cookies.locationname,
        backSeverity: cookies.severity,
        backLocationType: cookies.locationType,
        backlocateid: cookies.locationid
        
      });
      console.log("Registration successful");
      console.log(response);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="auth-form-container">
        <h2>Create a Cleanup Event!</h2>
        <form className="register-form">
          <label>Date:</label>
          <input type="date" value={date} onChange={(handleDateChange) => setDate(handleDateChange.target.value)} />

          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

          <label>Location:</label>
          <p>
            Longitude: {longitude.toFixed(6)} Latitude: {latitude.toFixed(6)}
          </p>
          <input
            id="location"
            type="hidden"
            value={`(${longitude.toFixed(6)}, ${latitude.toFixed(6)})`}
          />

          <label>Description:</label>
          <textarea value={description} onChange={(handleChange) => setDescription(handleChange.target.value)} />

        </form>
        <div className="button-container">
          <button className="form-btn" onClick={handleUpdate}>
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default CleanUpRegister;