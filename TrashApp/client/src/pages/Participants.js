import * as React from "react";
import NavigationBar from '../Components/NavBar';
import '../Components/CSS/Register.css';
import { Route, useNavigate } from 'react-router-dom';
import hostCrown from '../images/host-crown.png';
import volIcon from '../images/volunteer-icon.png';
import guestIcon from '../images/guest-icon.png';


export const Participants = () => {
    const navigate = useNavigate();
  
    return (
        <div>
        <NavigationBar />
          {/* Settings component at the top */}
          <div className="auth-form-container">
            <h1>Participants List</h1>
            <div className="register-form">
                <h2>Host <img src={hostCrown} alt="Host Icon" style={{ width: '30px', height: '30px' }} /></h2>
              
                <h2>Volunteer 1 <img src={volIcon} alt="Volunteer Icon" style={{ width: '30px', height: '30px' }} /></h2>
              
                <h2>Volunteer 2 <img src={volIcon} alt="Volunteer Icon" style={{ width: '30px', height: '30px' }} /></h2> 
             
                <h2>Guest 1 <img src={guestIcon} alt="Guest Icon" style={{ width: '30px', height: '30px' }} /> </h2>
            
            <button type="submit" className="form-btn">
                Verify User
            </button>
            </div>
          </div>
        </div>
    );
  };
  
  export default Participants;