import React from 'react'
import { useCookies } from 'react-cookie';

const Settings = () => {
  const [cookies] = useCookies(['email', 'password', 'lastName', 'firstName'])

  const userEmail= cookies.email;
  const fname = cookies.firstName;
  const lname = cookies.lastName;
  const pass = cookies.password;
  return (
    <div className="container">
        <h1>Settings</h1>
        <div className="SettingsDataRetrieval">
          <h1>FirstName {fname}</h1>
           {/* this is where the data from the  database will go  */}
          <h1>LastName: {lname}</h1>
           {/* this is where the data from the  database will go  */}
          <h1>Membership Status:  V</h1> 
           {/* this is where the data from the  database will go  */}
          <h1>Email: {userEmail}</h1>
           {/* this is where the data from the  database will go  */}
          <h1>Password: {pass}</h1>
           {/* this is where the data from the  database will go  */}

          <button  className="form-btn"onClick={() => Navigate('/Editinformation')}> Edit Information</button>
          
        </div>

    </div>

  )
}

export default Settings