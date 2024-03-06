import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CSS/Register.css';

import Axios from 'axios'

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstname, setfName] = useState('');
    const [lastname, setLName] = useState('');
    const [error, setError] = useState('');

    const backregister = async () => {
    try {
        const response = await Axios.post("http://localhost:5000/register", {
            backFname: firstname,
            backLname: lastname,
            backEmail: email,
            backPassword: pass
        });
        console.log("Registration successful");
        // Redirect or perform registration action
        console.log(response)
        Navigate('/'); 
    }catch (error) {
        console.error('An error ocurred:', error)
    }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateName(firstname) && validateName(lastname) && validateEmail(email) && validatePassword(pass)) {
            console.log("Registration successful");
            // Redirect or perform registration action
            Navigate('/'); 
        } else {
            setError('Please check your input fields.');
        }
    }

    const validateName = (name) => {
        return name.trim().length > 0; // At least one character
    }

    const validateEmail = (email) => {
        // Regular expression for email validation
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const validatePassword = (password) => {
        // Validate password criteria (e.g., length, complexity)
        return password.length >= 6;
    }

    const Navigate = useNavigate();
    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label>Name</label>
                <input value={firstname} onChange={(e) => setfName(e.target.value)} name="firstname" id="firstname" placeholder="First Name" />
                <input value={lastname} onChange={(e) => setLName(e.target.value)} name="lastname" id="lastname" placeholder="Last Name" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="form-btn" onClick={backregister}>Register</button>
            </form>
            <div>
                <a className="link-btn" onClick={() => Navigate('/')}>Already have an account? Login here</a>
            </div>
        </div>
    )
}

export default Register;
