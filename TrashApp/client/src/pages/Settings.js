import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../Components/NavBar';
import { useCookies } from 'react-cookie';

export const Settings = () => {
  const [cookies, removeCookies] = useCookies(['email', 'password', 'lastName', 'firstName', 'ishost']);
  const userEmail = cookies.email;
  const navigate = useNavigate();
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);

  const handleLogout = () => {
    setLogoutConfirmationOpen(true);
  };

  const handleIsHost = () => {
    return cookies.ishost ? <h3>Membership Status: Host</h3> : <h3>Membership Status: Volunteer</h3>;
  };

  const handleLogoutConfirm = () => {
    // Perform logout actions here
    removeCookies('userID');
    removeCookies('email');
    removeCookies('firstname');
    removeCookies('ishost');
    removeCookies('lastname');
    removeCookies('latitude');
    removeCookies('longitude');
    removeCookies('locationType');
    removeCookies('locationid');
    removeCookies('locationname');
    removeCookies('password');
    removeCookies('severity');
    removeCookies('createdByHost')
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
          <h3>First Name: {cookies.firstname}</h3>
          <h3>Last Name: {cookies.lastname}</h3>
          {handleIsHost()}
          <h3>Email: {userEmail}</h3>
          <div className="button-container">
            {/* <button className="form-btn" onClick={() => navigate('/Editinformation')}>Edit Information</button> */}
            <button className="form-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {logoutConfirmationOpen && (
        <div className="logout-confirmation">
          <div className="confirmation-dialog">
            <h2>Logout Confirmation</h2>
            <p>Are you sure you want to logout?</p>
            <div className="confirmation-buttons">
              <button onClick={handleLogoutCancel}>Cancel</button>
              <button onClick={handleLogoutConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
