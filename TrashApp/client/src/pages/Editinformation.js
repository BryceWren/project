import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Components/CSS/Register.css';
import NavigationBar from '../Components/NavBar';
import { useCookies } from 'react-cookie';

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
    const [cookies] = useCookies(['email', 'password', 'lastname', 'firstname', 'ishost'])
    const Navigate = useNavigate();

    const usermail = cookies.email
    const lName = cookies.lastname
    const fName = cookies.firstname



    const handleUpdate = (e) => {
        e.preventDefault();
        setFirstnameError('');
        setLastnameError('');
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

    const validateInput = () => {
        let isValid = true;
        if (!firstname.trim()) {
            setFirstnameError('First name is required');
            isValid = false;
        }
        if (!lastname.trim()) {
            setLastnameError('Last name is required');
            isValid = false;
        }
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
                    <label htmlFor="firstname">First Name</label>
                    <input
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        name="firstname"
                        id="firstname"
                        placeholder={fName}
                    />
                    {firstnameError && <p className="error-message">{firstnameError}</p>}

                    <label htmlFor="lastname">Last Name</label>
                    <input
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        name="lastname"
                        id="lastname"
                        placeholder={lName}
                    />
                    {lastnameError && <p className="error-message">{lastnameError}</p>}

                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        placeholder={usermail}
                    />
                    {emailError && <p className="error-message">{emailError}</p>}

                    <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        placeholder="******"
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        id="confirm-password"
                        placeholder="******"
                    />
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
