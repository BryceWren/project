import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useLocation, useNavigate } from 'react-router-dom';

export const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
            onClick={() => handleNavigation('/')}
            sx={{ color: location.pathname === '/' ? '#288dec' : 'inherit' }}
          />
        </BottomNavigation>
      </Box>
    </div>
  );
};

export default Settings;
