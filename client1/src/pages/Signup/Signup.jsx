import "./Signup.scss";
import { useRef, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/MMlogo.png";
import { debounceUsernameCheck } from "./debounce";

export function Signup() {
    console.log("rendering signup page")
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigateTo = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const errorMessageRef = useRef();

    async function handleSignup(e) {
        e.preventDefault();

        if (!username) {
            setErrorMessage("Please enter a Username");
            errorMessageRef.current.style.color = "red";
            return;
        }

        if (!email) {
            setErrorMessage("Please enter an email");
            errorMessageRef.current.style.color = "red";
            return;
        }

        if (!password) {
            setErrorMessage("Please enter a password");
            errorMessageRef.current.style.color = "red";
            return;
        }

        if (!passwordConfirm) {
            setErrorMessage("Please confirm password");
            errorMessageRef.current.style.color = "red";
            return;
        }

        if (password !== passwordConfirm) {
            setErrorMessage("Passwords do not match");
            errorMessageRef.current.style.color = "red";
            return;
        }

        try {
            const response = await axios.post(`${backendUrl}/melody-mastermind/api/account/signup`, { username, email, password });
            navigateTo("/");
        } catch (err) {
            setErrorMessage("Something went wrong with the signup....");
            errorMessageRef.current.style.color = "red";
            console.log(err);
        }
    }

    function handleUsernameChange(e) {
        const updatedUsername = e.target.value;
        setUsername(updatedUsername);
        debounceUsernameCheck(checkUsernameAvailable, updatedUsername)
    }

    async function handlePasswordChange(e) {
        const password = e.target.value;
        setPassword(password);
    }

    async function handlePasswordConfirmChange(e) {
        const passwordConfirm = e.target.value;
        setPasswordConfirm(passwordConfirm);
    }

    async function handleEmailChange(e) {
        const email = e.target.value;
        setEmail(email);
    }

    async function checkUsernameAvailable(username) {
        console.log("Checking server for username");
        try {
            const response = await axios.post(`${backendUrl}/melody-mastermind/api/users/check`, { username: username });
            const available = response.data.username_available;
            if (available) {
                setErrorMessage("Username available!");
                errorMessageRef.current.style.color = "green";
            } else {
                setErrorMessage("Username already taken. Please choose another");
                errorMessageRef.current.style.color = "red";
            }
        } catch (err) {
            console.log(err);
            setErrorMessage("Error checking username availability");
            errorMessageRef.current.style.color = "red";
        }
    }

    // const debounceUsernameCheck = useCallback(debounce(checkUsernameAvailable), [])

    // function debounce(callback) {
    //     const delay = 1000
    //     let timeout

    //     return (...args) => {
    //         console.log(...args)
    //         clearTimeout(timeout)
    //         timeout = setTimeout(() => callback(...args), delay)
    //     }
    // }

    return (
        <section className="signup">
            <Link to="/">
                <div className="signup__brand">
                    <img src={"/melody-mastermind" + logo} alt="melody mastermind logo" className="signup__logo" />
                    <h1 className="signup__name">Melody <br /> MasterMind</h1>
                </div>
            </Link>

            <h1 className="signup__heading">Create Account</h1>

            <form className="signup__form" onSubmit={handleSignup}>
                <span className="create-account__message" ref={errorMessageRef}>{errorMessage}</span>
                <label htmlFor="signup__username" className="signup__label">Username</label>
                <input onChange={handleUsernameChange} value={username} type="text" id="signup__username" className="signup__username" placeholder="Choose username" />

                <label htmlFor="signup__email" className="signup__label">Email</label>
                <input onChange={handleEmailChange} value={email} type="text" id="signup__email" className="signup__email" placeholder="Email" />

                <label htmlFor="signup__password" className="signup__label">Password</label>
                <input onChange={handlePasswordChange} value={password} type="password" id="signup__password" className="signup__password" placeholder="Choose password" />

                <label htmlFor="signup__password--confirm" className="signup__label">Confirm Password</label>
                <input onChange={handlePasswordConfirmChange} value={passwordConfirm} type="password" id="signup-password--confirm" className="signup__password signup__password--confirm" placeholder="Confirm password" />

                <button className="signup__button">Create Account</button>
            </form>
        </section>
    );
}
