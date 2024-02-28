import React, { useState } from "react";
import NavigationBar from '../Components/NavBar';
import '../Components/CSS/Register.css';

const EditInformation = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    // const [utype, setUtype] = useState('');// user type constant 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [updateMessage, setUpdateMessage] = useState(false);

    const handleUpdate = (e) => {
        e.preventDefault();
        if (validateInput()) {
            console.log('Settings updated:', { firstname, lastname, email, password });
            setUpdateMessage(true);
            setTimeout(() => {
                setUpdateMessage(false);
            }, 3000); // Hide message after 3 seconds
        } else {
            setError('Please check your input fields.');
        }
    };

    const validateInput = () => {
        // Basic validation for first name, last name, email, and password
        if (firstname.trim() === '' || lastname.trim() === '' || email.trim() === '' || password.trim() === '') {
            return false;
        }
        // Add more validation criteria as needed
        return true;
    };

    return (
        <div>
            <NavigationBar />
            {/* this is the outer rim of the Application */}
            <div className="auth-form-container">
                <h1>Edit Information</h1>
                {/* this is where the uses the form boxes  to edit and update their info */}
                <form className="register-form">
                    <label htmlFor="firstname">First Name</label>
                    <input value={firstname} onChange={(e) => setFirstname(e.target.value)} name="firstname" id="firstname" placeholder="Joe" />

                    <label htmlFor="lastname">Last Name</label>
                    <input value={lastname} onChange={(e) => setLastname(e.target.value)} name="lastname" id="lastname" placeholder="Teti" />

                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="joeteti@gmail.com" />

                    {/* <label htmlFor="UserType">User Type</label>
                    <input value={utype} onChange={(e) => setUtype(e.target.value)} type="text" id="UserType" placeholder="Host,Volunteer,Guest" /> */}

                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="******" />

                    {error && <p className="error-message">{error}</p>}
                    {updateMessage && <p className="success-message">Settings updated</p>}
                    <button type="submit" className="form-btn" onClick={handleUpdate}>Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditInformation;
