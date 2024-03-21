import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Route, useNavigate } from 'react-router-dom';
import NavigationBar from '../Components/NavBar';
import { Navigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export const Settings = () => {
  const navigate = useNavigate();
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);

  const handleLogout = () => {
    setLogoutConfirmationOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Perform logout actions here
    navigate('/');
    setLogoutConfirmationOpen(false);
  };

  const handleLogoutCancel = () => {
    setLogoutConfirmationOpen(false);
  };

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
          <h3>MemberShip Status</h3> 
          {/* this is where the data from the  database will go  */}
          <h3>Email</h3>
          {/* this is where the data from the  database will go  */}
          <h3>Password</h3>
          {/* this is where the data from the  database will go  */}
          
          <div className="button-container">
            <button className="form-btn" onClick={() => navigate('/Editinformation')}> Edit Information</button>
            <button className="form-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      
      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutConfirmationOpen}
        onClose={handleLogoutCancel}
      >
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Settings;
