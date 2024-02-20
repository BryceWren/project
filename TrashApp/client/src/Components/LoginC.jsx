// this is  the  entire login page
import React from 'react'
import './CSS/Login.css'
import {useNavigate} from "react-router-dom"




export const LoginC = () => {
  const navigate = useNavigate();
  return (
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
 
    </div>
     </div>
     <button className="link-btn" onClick={() => navigate('/home')}>Login</button>
    </div> 
    <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here</button>
    </div>
    </div>
  

  
    
  
  )
}

export default LoginC