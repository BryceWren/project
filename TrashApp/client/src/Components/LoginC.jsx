// this is  the  entire login page
import React from 'react';
import { useNavigate } from "react-router-dom";
import './CSS/Login.css';

export const LoginC = () => {
  return (
    <div className="Container">
    <div className="header">
    <div className="Title"><h1>Sign In</h1></div>
    <div className ="underline"></div>
    </div>
    {/*  This is where the UserName goes  */}
    <div className ="typeBoxes"> 
    <div className=" Username">
    <input type=" Text" placeholder="JohnDoe93" />
    </div>
    {/*  this is where the password  goes  */}
    <div className ="typeBoxes"> 
    <div className="Password">
    <input type=" Password" placeHolder= "**********" />
    </div>
    <div className= "The container"> 
    <div className ="Submit button">
    <button className="Link-btn" onClick={() => useNavigate ('/home')}>Login</button>     
    {/* this is for the  login button and where ever its suppose to route too :) */}
    </div>
     </div>
    <div className="newUser?">
    <p>Dont Have an account? </p><button classname="Link-btn" onClick={() => UseNavigate ('/')}> Register Here</button>     
    </div> {/* whoever  does the registration page this is where the link goes :) also may turn this into a button, i just  need opinions */}
 
    </div>
    </div>
    </div>
    


  
    
  )
}

export default LoginC