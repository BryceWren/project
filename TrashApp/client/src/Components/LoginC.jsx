// this is  the  entire login page
import React from 'react'

const LoginC = () => {
  return (
    <div classname="Container"><h1>Welcome!</h1>
    <div classname="header">
    <div classname="Title"><h1>Sign In</h1></div>
    <div classname ="underline"></div>
    </div>
    {/*  This is where the UserName goes  */}
    <div classname ="type boxes"> 
    <div classname=" Username">
    <input type=" Text" />
    </div>
    {/*  this is where the password  goes  */}
    <div classname ="type boxes"> 
    <div classname="Password">
    <input type=" Text" />
    </div>
    <div classname= "The container"> 
    <div classname ="Submit button">
      <p>Login</p>
    </div>
     </div>
    <div classname="newUser?"><p>Are you A new User <a href="">Click Here!</a></p></div> {/* whoever  does the registration page this is where the link goes :) */}

    </div>
    </div>
    </div>

  
    
  
  )
}

export default LoginC