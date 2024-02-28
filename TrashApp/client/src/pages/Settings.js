import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Route, useNavigate } from 'react-router-dom';


export const Settings = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    setValue(0);
    navigate('/home');
  };

  const handleEventsClick = () => {
    setValue(1);
    navigate('/events');
  };

  const handleSettingsClick = () => {
    setValue(2);
    navigate('/settings');
  };

  return (
    
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0}}>

      {/* Settings body */}
      <div className="ContainerS">
        <h1>Settings</h1>
        <div className="SettingsDataRetrieval">
          <h3>First Name</h3>
           {/* this is where the data from the  database will go  */}
          <h3>Last Name</h3>
           {/* this is where the data from the  database will go  */}
          <h3>Mmembership Status</h3> 
           {/* this is where the data from the  database will go  */}
          <h3>Email</h3>
           {/* this is where the data from the  database will go  */}
          <h3>Password</h3>
           {/* this is where the data from the  database will go  */}

          <button  className="EditButton"onClick={() => Navigate('/Editinformation')}> Edit Information</button>
          
         </div>
      </div>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        
  
        <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} onClick={handleHomeClick} />
        <BottomNavigationAction label="Events" icon={<CalendarMonthRoundedIcon />} onClick={handleEventsClick}/>
        <BottomNavigationAction label="Settings" icon={<SettingsRoundedIcon />} onClick={handleSettingsClick}/>
      </BottomNavigation>
      
      

    </Box>

    
    
  );
}

export default Settings;

//<button className="logoutbtn" onClick={() => navigate('/')}>LOGOUT</button>