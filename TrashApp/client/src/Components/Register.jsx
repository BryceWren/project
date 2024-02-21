import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstname, setfName] = useState('');
    const [lastname, setLName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    const Navigate = useNavigate();
    return (
        <div className="auth-form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <input value={(firstname)} name="firstname" id="firstname" placeholder="FirstName" />
            <input value={(lastname)} name="lastname" id="lastname" placeholder="LastName" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            

        </form>
        <button className="link-btn" onClick={() => Navigate('/')}>Register</button>
        <div>
            
        </div>
        <button className="link-btn" onClick={() => Navigate('/')}>Already have an account? Log-in here</button>
        </div>
    )
}

export default Register