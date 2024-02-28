import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CSS/Register.css';

export const LoginC = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(email) && validatePassword(pass)) {
            console.log("Login successful");
            // Redirect to home page or perform login action
            Navigate('/home');
        } else {
            setError('Invalid email or password. Please check your credentials.');
        }
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
            <h2>Welcome!</h2>
            <h2>Login</h2>
            
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="form-btn">Login</button>
                
                <a className="link-btn" onClick={() => Navigate('/register')}>Don't have an account? Register here</a>
            
            </form>
            
        </div>
    )
}

export default LoginC;
