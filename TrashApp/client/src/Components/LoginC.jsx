import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CSS/Register.css';

export const LoginC = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    const Navigate = useNavigate();
    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            </form>
            <button onClick={() => Navigate('/home')}>Login</button>
            <div>
                <a className="link-btn" onClick={() => Navigate('/register')}>Don't have an account? Register here</a>
            </div>
        </div>
    )
}

export default LoginC