// this is  the  entire login page
import React from 'react'
import './CSS/Login.css'

export const LoginC = () => {
  return (
    <body classname ="LoginBackground">
    <div classname="Container"><h1></h1>
    <div classname="header">
    <div classname="Title"><h1>Sign In</h1></div>
    <div classname ="underline"></div>
    </div>
    {/*  This is where the UserName goes  */}
    <div classname ="type boxes"> 
    <div classname=" Username">
    <input type=" Text" placeholder="JohnDoe93" />
    </div>
    {/*  this is where the password  goes  */}
    <div classname ="type boxes"> 
    <div classname="Password">
    <input type=" Password" placeHolder= "**********" />
    </div>
    <div classname= "The container"> 
    <div classname ="Submit button">
      <a href ="">
    <button type="LoginButton">Login</button>     
    {/* this is for the  login button and where ever its suppose to route too :) */}
    </a>
    </div>
     </div>
    <div classname="newUser?"><p classname="new user?">Are you A new User</p>
    < a href='Register.jsx '>
    <button>Click Here!</button>
    </a>
    </div> {/* whoever  does the registration page this is where the link goes :) also may turn this into a button, i just  need opinions */}
 
 
    </div>
    </div>
    </div>
    </body>

  
    
  )
}

export default LoginC