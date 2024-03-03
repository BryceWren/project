import React, {useState} from "react"
import HomePage from "./HomePage"
import NavigationBar from '../Components/NavBar';
import Calendar from "react-calendar";
import '../Components/CSS/Register.css';


 
 const PostUI = () => {
   return (
     <div className="auth-form-Container">
      <h1>Posted Cleanup</h1>
     {/* This is where we would put the  picture if we  actually implement it */}
     <h5>Participants: </h5> this is where we would put the accumulating  Counter for the participants
      <h5>Date:</h5>
      {/* information from  the database will go here */}
      <h5>Time:</h5>
      {/* information from  the database will go here */}
     <h5>Description:</h5>
     {/* information from  the database will go here */}
     <h5>Location:</h5>
     {/* information from  the database will go here */}
     





    </div>
   )
 }
 
 export default PostUI;


