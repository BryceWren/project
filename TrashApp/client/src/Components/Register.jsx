import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CSS/Register.css';
import Axios from 'axios'
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [firstname, setfName] = useState('');
    const [lastname, setLName] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const Navigate = useNavigate();

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
        } catch (error) {
            console.error('An error occurred:', error)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nameError = validateName(firstname, lastname);
        const emailError = emailValidator(email);
        const passwordError = passwordValidator(pass);
        const confirmPasswordError = confirmPasswordValidator(pass, confirmPass);

        setFirstNameError(nameError.firstName);
        setLastNameError(nameError.lastName);
        setEmailError(emailError);
        setPasswordError(passwordError);
        setConfirmPasswordError(confirmPasswordError);

        if (!nameError.firstName && !nameError.lastName && !emailError && !passwordError && !confirmPasswordError) {
            const success = await backregister();
            if (success) {
                console.log("Registration successful");
                // Redirect to home page or perform login action
                Navigate('/home');
            } else {
                console.log("Account already registered")
            }
        }
    }

    const validateName = (firstname, lastname) => {
        let errors = { firstName: '', lastName: '' };
        if (!firstname) {
            errors.firstName = "First name is required";
        }
        if (!lastname) {
            errors.lastName = "Last name is required";
        }
        return errors;
    }

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
        } else if (password.length <= 8) {
            return "Password must have a minimum of 8 characters";
        }
        return "";
    };

    const confirmPasswordValidator = (password, confirmPassword) => {
        if (!confirmPassword) {
            return "Please confirm your password";
        } else if (password !== confirmPassword) {
            return "Passwords do not match";
        }
        return "";
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label>Name</label>
                <input value={firstname} onChange={(e) => setfName(e.target.value)} name="firstname" id="firstname" placeholder="First Name" />
                {firstNameError && <p className="error-message">{firstNameError}</p>}
                <input value={lastname} onChange={(e) => setLName(e.target.value)} name="lastname" id="lastname" placeholder="Last Name" />
                {lastNameError && <p className="error-message">{lastNameError}</p>}
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                {emailError && <p className="error-message">{emailError}</p>}
                <label htmlFor="password">Password</label>
                <div className="password-input">
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        id="password"
                        name="password"
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
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        id="confirm-password"
                        name="confirm-password"
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
                <button type="submit" className="form-btn">Register</button>
            </form>
            <div>
                <a className="link-btn" onClick={() => Navigate('/')}>Already have an account? Login here</a>
            </div>
        </div>
    )
}

export default Register;