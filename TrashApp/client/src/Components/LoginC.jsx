import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CSS/Register.css';
import recycleBinImage from '../images/recycle-bin.png';

export const LoginC = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const Navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailError = emailValidator(email);
        const passwordError = passwordValidator(pass);

        setEmailError(emailError);
        setPasswordError(passwordError);

        if (!emailError && !passwordError) {
            console.log("Login successful");
            // Redirect to home page or perform login action
            Navigate('/home');
        }

        // Validation for if email and password dont match
        // if (!emailError && !passwordError) {
        //     // Simulate login validation
        //     if (email !== "test@example.com" || pass !== "password123") {
        //         setLoginError("Email and password do not match");
        //     } else {
        //         console.log("Login successful");
        //         // Redirect to home page or perform login action
        //         Navigate('/home');
        //     }
        // }
    }

    return (
        <div className="auth-form-container">
            <h2>Welcome to the Trash App!</h2>
            <div className="avatar-frame">
                <img src={recycleBinImage} alt="Avatar Frame" width="130" height="130" />
            </div>
            <h2>Login</h2>
            
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                {emailError && <p className="error-message">{emailError}</p>}
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                {passwordError && <p className="error-message">{passwordError}</p>}
                <button type="submit" className="form-btn">Login</button>
                
                <a className="link-btn" onClick={() => Navigate('/register')}>Don't have an account? Register here</a>
            
            </form>
            
        </div>
    )
}

export default LoginC;
