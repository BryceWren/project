import React, { useState, useEffect } from "react";
import NavigationBar from "../Components/NavBar";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const PopupMessage = ({ message }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <p>{message}</p>
      </div>
    </div>
  );
};

const CleanUpRegister = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [clothingAttire, setClothingAttire] = useState("");
  const [itemsToBring, setItemsToBring] = useState("");
  const [cookies] = useCookies(["locationname", "longitude", "latitude", "severity", "locationType", "locationid"]);
  const [longitude, setLongitude] = useState(cookies.longitude || 0);
  const [latitude, setLatitude] = useState(cookies.latitude || 0);
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [clothingAttireError, setClothingAttireError] = useState("");
  const [itemsToBringError, setItemsToBringError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage("");
        navigate("/events");
      }, 3000); // hide message after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [message, navigate]);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const formattedInput = input.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
    setDate(formattedInput);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setDateError("");
    setTimeError("");
    setDescriptionError("");
    setClothingAttireError("");
    setItemsToBringError("");
    let isValid = true;

    if (!date) {
      setDateError("Please select a date.");
      isValid = false;
    }

    if (!time) {
      setTimeError("Please select a time.");
      isValid = false;
    }

    if (!description) {
      setDescriptionError("Please provide a description of the event.");
      isValid = false;
    }

    if (!clothingAttire) {
      setClothingAttireError("Please provide clothing attire.");
      isValid = false;
    }

    if (!itemsToBring) {
      setItemsToBringError("Please provide items to bring.");
      isValid = false;
    }

    if (isValid) {
      await eventregister();
      setMessage("Event has been created!");
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
        backlocateid: cookies.locationid,
        backClothing: cookies.clothing,
        backItems: cookies.items
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
        {message && <PopupMessage message={message} />}
        <form className="register-form">
          <label>Date:</label>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          <div className="error-message">{dateError}</div>

          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <div className="error-message">{timeError}</div>

          <label>Location:</label>
          <p>Longitude: {longitude.toFixed(6)} Latitude: {latitude.toFixed(6)}</p>
          <input id="location" type="hidden" value={`(${longitude.toFixed(6)}, ${latitude.toFixed(6)})`} />

          <label>What is the event about?</label>
          <textarea value={description} onChange={handleChange} />
          <div className="error-message">{descriptionError}</div>

          <label>What should participants wear?</label>
          <input type="text" value={clothingAttire} onChange={(e) => setClothingAttire(e.target.value)} />
          <div className="error-message">{clothingAttireError}</div>

          <label>What items should participants bring?</label>
          <input type ="text" value={itemsToBring} onChange={(e) => setItemsToBring(e.target.value)} />
          <div className="error-message">{itemsToBringError}</div>

          <div className="button-container">
            <button className="form-btn" onClick={handleUpdate}>Create Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CleanUpRegister;
