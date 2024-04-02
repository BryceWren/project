import React, { useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import NavigationBar from '../Components/NavBar';
import { Navigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';

export const Settings = () => {
  const [cookies] = useCookies(['email', 'password', 'lastName', 'firstName', 'ishost']);

  const userEmail = cookies.email;
  const pass = cookies.password;
  const navigate = useNavigate();
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);

  const handleLogout = () => {
    setLogoutConfirmationOpen(true);
  };

  const handleIsHost = () => {
    if (cookies.ishost) {
      return (<h3> Membership Status: Host</h3>);
    } else {
      return (<h3> Membership Status: Volunteer</h3>);
    }
  };

  const handleLogoutConfirm = () => {
    // Perform logout actions here
    navigate('/');
    setLogoutConfirmationOpen(false);
  };

  const handleLogoutCancel = () => {
    setLogoutConfirmationOpen(false);
  };

  // const hidePassword = () => {
  //   return '*'.repeat(pass.length);
  // };

  return (
    <div>
      <NavigationBar />
      {/* Settings component at the top */}
      <div className="auth-form-container">
        <h1>Settings</h1>
        <div className="register-form">
          <h3>First Name: {cookies.firstname}</h3>
          
          <h3>Last Name: {cookies.lastname}</h3>
          
          {handleIsHost()}
          
          <h3>Email: {userEmail}</h3>
         
          {/* <h3>Password: {hidePassword()}</h3> */}
          
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
};

export default Settings;
