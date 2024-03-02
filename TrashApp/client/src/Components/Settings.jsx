import React from 'react'

const Settings = () => {

  return (
    <div className="container">
        <h1>Settings</h1>
        <div className="SettingsDataRetrieval">
          <h1>FirstName:</h1>
           {/* this is where the data from the  database will go  */}
          <h1>LastName:</h1>
           {/* this is where the data from the  database will go  */}
          <h1>Membership Status:</h1> 
           {/* this is where the data from the  database will go  */}
          <h1>Email:</h1>
           {/* this is where the data from the  database will go  */}
          <h1>Password:</h1>
           {/* this is where the data from the  database will go  */}

          <button  className="form-btn"onClick={() => Navigate('/Editinformation')}> Edit Information</button>
          
        </div>

    </div>

  )
}

export default Settings