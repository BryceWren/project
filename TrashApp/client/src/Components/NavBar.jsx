import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);
  const [,, removeCookies] = useCookies('userID')

  const handleLogout = () => {
    setLogoutConfirmationOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Perform logout actions here
    removeCookies('userID')
    removeCookies('email')
    removeCookies('firstname')
    removeCookies('ishost')
    removeCookies('lastname')
    removeCookies('latitude')
    removeCookies('longitude')
    removeCookies('locationType')
    removeCookies('locationid')
    removeCookies('locationname')
    removeCookies('password')
    removeCookies('severity')
    removeCookies('dumpster')
    removeCookies('eventid')
    removeCookies('parking')
    removeCookies('createdByHost')
    navigate('/');
    setLogoutConfirmationOpen(false);
  };

  const handleLogoutCancel = () => {
    setLogoutConfirmationOpen(false);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div>
      {/* Bottom navigation */}
      <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Home"
            icon={<HomeRoundedIcon />}
            onClick={() => handleNavigation('/home')}
            sx={{ color: location.pathname === '/home' ? '#288dec' : 'inherit' }}
          />
          <BottomNavigationAction
            label="Events"
            icon={<CalendarMonthRoundedIcon />}
            onClick={() => handleNavigation('/events')}
            sx={{ color: location.pathname === '/events' ? '#288dec' : 'inherit' }}
          />
          <BottomNavigationAction
            label="Settings"
            icon={<SettingsRoundedIcon />}
            onClick={() => handleNavigation('/settings')}
            sx={{ color: location.pathname === '/settings' ? '#288dec' : 'inherit' }}
          />
          <BottomNavigationAction
            label="Logout"
            icon={<LogoutRoundedIcon />}
            onClick={handleLogout}
            sx={{ color: location.pathname === '/' ? '#288dec' : 'inherit' }}
          />
        </BottomNavigation>
      </Box>
      
      {/* Logout Confirmation Dialog */}
      <ConfirmationDialog
        open={logoutConfirmationOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="Logout Confirmation"
        content="Are you sure you want to logout?"
        className="logout-confirmation"
      />
    </div>
  );
};

export default Settings;
