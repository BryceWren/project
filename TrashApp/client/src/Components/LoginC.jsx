import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CSS/Register.css';
import recycleBinImage from '../images/recycle-bin.png';
import Axios from 'axios';
import { useCookies } from 'react-cookie'
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export const LoginC = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const Navigate = useNavigate();

    const [, setCookie] = useCookies(['userID','firstname','lastname','email','ishost','password'])

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailError = emailValidator(email);
        const passwordError = passwordValidator(pass);

        setEmailError(emailError);
        setPasswordError(passwordError);

        if (!emailError && !passwordError) {
            const success = await login();
            if (success) {
                console.log("Login successful");
                // Redirect to home page or perform login action
                Navigate('/home');
            } else {
                setLoginError("Incorrect email or password");
            }
        }
    }

    const login = async () => {
        try {
            const response = await Axios.post("http://localhost:5000/", {
                backEmail: email,
                backPassword: pass
            });
            console.log(response)
            setCookie('userID', response.data[0].userid) 
            setCookie('firstname', response.data[0].firstName)
            setCookie('lastname', response.data[0].lastName)
            setCookie('email', response.data[0].email)
            setCookie('ishost', response.data[0].ishost)
            setCookie('password', response.data[0].password)
            if (response.data.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('An error occurred:', error);
            return false;
        }
    };

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
                <div className="password-input">
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        id="password"
                        name="password"
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
                {loginError && <p className="error-message">{loginError}</p>}
                <button type="submit" className="form-btn">Login</button>
                <a className="link-btn" onClick={() => Navigate('/register')}>Don't have an account? Register here</a>
            </form>
        </div>
    )
}

export default LoginC;