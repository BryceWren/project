import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Components/CSS/Register.css';
import NavigationBar from '../Components/NavBar';
import { useCookies } from 'react-cookie';
import Axios from 'axios';
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const EditInformation = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [updateMessage, setUpdateMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [cookies] = useCookies(['userID', 'email', 'password', 'lastname', 'firstname', 'ishost'])
    const Navigate = useNavigate();

    const usermail = cookies.email
    const lName = cookies.lastname
    const fName = cookies.firstname

    const handleUpdate = (e) => {
        e.preventDefault();
        updateAllSettings();
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        const isValid = validateInput();
        if (isValid) {
            console.log('Settings updated:', { firstname, lastname, email, password });
            setUpdateMessage(true);
            setTimeout(() => {
                setUpdateMessage(false);
                Navigate('/settings');
            }, 3000);
        }
    };
    const updateAllSettings = async () => {
        try {
          const response = await Axios.put("http://localhost:5000/Editinformation", {
            backemail: cookies.email,
            backcolor: cookies.password,
            backUserID: cookies.userID
          });
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };

    const validateInput = () => {
        let isValid = true;
        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Incorrect email format');
            isValid = false;
        }
        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length <= 8) {
            setPasswordError('Password must have a minimum of 8 characters.');
            isValid = false;
        }
        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        }
        return isValid;
    };

    return (
        <div>
            <NavigationBar />
            <div className="auth-form-container">
                <h1>Edit Information</h1>
                <form className="register-form">
                    {lastnameError && <p className="error-message">{lastnameError}</p>}

                    <label htmlFor="email">Email</label>
                    <button>change email?</button>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        placeholder={usermail}
                    />
                    {emailError && <p className="error-message">{emailError}</p>}

                    <label htmlFor="password">Password</label>
                    <div className="password-input">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="******"
                            className="password-field"
                        />
                        <div className="show-hide-password" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <VisibilityOffOutlinedIcon className="password-toggle-icon" />
                            ) : (
                                <VisibilityOutlinedIcon className="password-toggle-icon" />
                            )}
                        </div>
                    </div>
                    {passwordError && <p className="error-message">{passwordError}</p>}

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <div className="password-input">
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            id="confirm-password"
                            placeholder="******"
                            className="password-field"
                        />
                        <div className="show-hide-password" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <VisibilityOffOutlinedIcon className="password-toggle-icon" />
                            ) : (
                                <VisibilityOutlinedIcon className="password-toggle-icon" />
                            )}
                        </div>
                    </div>
                    {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}

                    {updateMessage && <p className="success-message">Settings updated! Back to Settings!</p>}
                    <button type="submit" className="form-btn" onClick={handleUpdate}>
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditInformation;