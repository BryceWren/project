import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditInformation = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [utype, setUtype] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const nav = useNavigate();

    const emailValidator = (email) => {
        if (!email) {
            return "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            return "Incorrect email format";
        }
        return "";
    };

    const passwordValidator = (password) => {
        if (!password) {
            return "Password is required";
        } else if (password.length < 8) {
            return "Password must have a minimum of 8 characters";
        }
        return "";
    };

    const handleUpdate = () => {
        const emailError = emailValidator(email);
        const passwordError = passwordValidator(password);

        setEmailError(emailError);
        setPasswordError(passwordError);

        if (!emailError && !passwordError) {
            // Perform update action
            console.log('Settings updated:', { firstname, lastname, email, utype, password });
            nav('/settings');
        }
    };

    return (
        <div className="Container">
            <h1>Edit Information</h1>
            <form className="EditInformation-form">
                <label htmlFor="firstname">First Name</label>
                <input value={firstname} onChange={(e) => setFirstname(e.target.value)} name="firstname" id="firstname" placeholder ="Joe" />

                <label htmlFor="lastname">Last Name</label>
                <input value={lastname} onChange={(e) => setLastname(e.target.value)} name="lastname" id="lastname" placeholder=" Teti" />

                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="exampleEmail.gmail.com" />
                {emailError && <p className="error-message">{emailError}</p>}

                <label htmlFor="UserType">User Type</label>
                <input value={utype} onChange={(e) => setUtype(e.target.value)} type="text" id="UserType" placeholder="Host,Volunteer,Guest" />

                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="******" />
                {passwordError && <p className="error-message">{passwordError}</p>}

                <button type="button" onClick={handleUpdate}>Update Settings</button>
            </form>
        </div>
    );
};

export default EditInformation;
