import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CSS/Register.css';
import Axios from 'axios'

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstname, setfName] = useState('');
    const [lastname, setLName] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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
        }catch (error) {
            console.error('An error ocurred:', error)
        }
        };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nameError = validateName(firstname, lastname);
        const emailError = emailValidator(email);
        const passwordError = passwordValidator(pass);

        setFirstNameError(nameError.firstName);
        setLastNameError(nameError.lastName);
        setEmailError(emailError);
        setPasswordError(passwordError);

        if (!nameError.firstName && !nameError.lastName && !emailError && !passwordError) {
            console.log("Registration successful");
            // Redirect or perform registration action
            Navigate('/');
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
        } else if (password.length < 8) {
            return "Password must have a minimum of 8 characters";
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
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                {passwordError && <p className="error-message">{passwordError}</p>}
                <button type="submit" className="form-btn" OnClick={backregister}>Register</button>
            </form>
            <div>
                <a className="link-btn" onClick={() => Navigate('/')}>Already have an account? Login here</a>
            </div>
        </div>
    )
}

export default Register;
