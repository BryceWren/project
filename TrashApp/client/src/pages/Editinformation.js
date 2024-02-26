import React, { useState } from "react";
import NavigationBar from '../Components/NavBar';
import '../Components/CSS/Register.css';

const EditInformation = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    // const [utype, setUtype] = useState('');// user type constant 
    const [password, setPassword] = useState('');

    // below is whats being used to update the Original information that the use already inputed
    const handleUpdate = () => {
        console.log('Settings updated:', { firstname, lastname, email, utype, password });
    };

    return (
        <div>
        <NavigationBar />
        {/* this is the outer rim of the Application */}
        <div className="Container">
            <h1>Edit Information</h1>
        {/* this is where the uses the form boxes  to edit and update their info */}
            <form className="EditInformation-form">
                <label htmlFor="firstname">First Name</label>
                <input value={firstname} onChange={(e) => setFirstname(e.target.value)} name="firstname" id="firstname" placeholder ="Joe" />

                <label htmlFor="lastname">Last Name</label>
                <input value={lastname} onChange={(e) => setLastname(e.target.value)} name="lastname" id="lastname" placeholder=" Teti" />

                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="exampleEmail.gmail.com"  />

                {/* <label htmlFor="UserType">User Type</label>
                <input value={utype} onChange={(e) => setUtype(e.target.value)} type="text" id="UserType" placeholder="Host,Volunteer,Guest" /> */}

                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="******" />

                <button type="button" onClick={handleUpdate}>Update Settings</button>
            </form>
        </div>
        </div>
    );
};

export default EditInformation;
