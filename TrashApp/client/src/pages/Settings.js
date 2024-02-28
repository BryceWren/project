import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Route, useNavigate } from 'react-router-dom';
import NavigationBar from '../Components/NavBar';
import { Navigate } from 'react-router-dom';

export const Settings = () => {
const navigate = useNavigate();

  return (
    <div>
    <NavigationBar />
      {/* Settings component at the top */}
      <div className="auth-form-container">
        <h1>Settings</h1>
        <div className="register-form">
          <h3>First Name</h3>
          {/* this is where the data from the  database will go  */}
          <h3>Last Name</h3>
          {/* this is where the data from the  database will go  */}
          {/* <h3>UserType</h3>  */}
          {/* this is where the data from the  database will go  */}
          <h3>Email</h3>
          {/* this is where the data from the  database will go  */}
          <h3>Password</h3>
          {/* this is where the data from the  database will go  */}

          <button className="form-btn" onClick={() => navigate('/Editinformation')}> Edit Information</button>
          <button className="form-btn" onClick={() => navigate('/')}>Logout</button>
        </div>
      </div>
    </div>
    
  );
}
export default Settings;

//<button className="logoutbtn" onClick={() => navigate('/')}>LOGOUT</button>