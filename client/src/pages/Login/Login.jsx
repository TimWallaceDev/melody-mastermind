import { useRef, useState, useEffect } from "react"
import "./Login.scss"
import axios from 'axios'
import logo from "../../assets/MMlogo.png"
import { Link, useNavigate } from "react-router-dom"

export function Login() {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigateTo = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [passwordMessage, setPasswordMessage] = useState("")

    const errorMessageRef = useRef()
    const passwordMessageRef = useRef()

    useEffect(() => {
        function checkForAuthorization() {
            const JWT = localStorage.getItem("JWT")
            if (JWT) {
                navigateTo("/playlists")
            }
        }
        checkForAuthorization()
    }, [])

    async function handlePasswordChange(e) {
        const password = e.target.value
        setPassword(password)
    }

    function handleUsernameChange(e) {
        const username = e.target.value
        setUsername(username)
    }

    async function handleLogin(e) {
        //prevent form from submitting and refreshing page
        e.preventDefault()

        //check that username has been provided
        if (!username) {
            setErrorMessage("Please enter a username")
            errorMessageRef.current.style.color = "red"
            return
        }
        //check that password has been provided
        if (!password) {
            setPasswordMessage("Please enter a password")
            passwordMessageRef.current.style.color = "red"
            return

        }

        //send login information to backend
        try {
            const response = await axios.post(`${backendUrl}/melody-mastermind/api/account/login`, { username, password })

            //TODO save jwt in localstorage
            localStorage.setItem("JWT", response.data);
            localStorage.setItem("username", username)

            //navigate to playlists
            navigateTo("/playlists")
        } catch (err) {
            setErrorMessage("We couldn't sign you in. Please check your email and password.")
            errorMessageRef.current.style.color = "red"
            console.log(err)
            return
        }

        //close modal
        modalRef.current.style.display = "none";
    }

    async function handleGuest(e) {
        //prevent form from submitting and refreshing page
        e.preventDefault()

        //make request to server for a guest account
        try {
            const response = await axios.post(`${backendUrl}/melody-mastermind/api/account/guest`)

            //server will send back a JWT for guest to use
            //save jwt in localstorage
            const JWT = response.data.token
            const username = response.data.username
            localStorage.setItem("JWT", JWT)
            localStorage.setItem("username", username)
            navigateTo("/playlists")
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <section className="login">
            <div className="login__wrapper">

                <Link to="/" className="link">
                    <div className="login__brand">
                        <img src={"/melody-mastermind" + logo} alt="melody mastermind logo" className="login__logo" />
                        <h1 className="login__name">Melody <br></br> MasterMind</h1>
                    </div>
                </Link>

                <section className="login">
                    <form className="login__form" onSubmit={handleLogin}>
                        <h2 className="login__heading">Log In</h2>
                        <span className="login__message" ref={errorMessageRef}>{errorMessage}</span>
                        <label className="login__label">Username</label>
                        <input className="login__input" type="text" placeholder="Username" value={username} onChange={handleUsernameChange}></input>

                        <span className="login__message" ref={errorMessageRef}>{passwordMessage}</span>
                        <label className="login__label">Password</label>
                        <input type="password" className="login__input" placeholder="Password" onChange={handlePasswordChange} />
                        <button className="login__submit">Log In</button>
                    </form>
                </section>

                <span className="login__or">Or</span>

                <section className="guest">
                    <form className="guest__form" onSubmit={handleGuest}>
                        <button className="guest__button">
                            Continue as Guest
                        </button>
                    </form>
                </section>

                <section className="signup-button-wrapper">
                    <p className="signup-button-wrapper__or">Don't Have an Account?</p>
                    <Link to={"/signup"}>
                        <p className="signup-button-wrapper__link">Sign up Here</p>
                    </Link>

                </section>

            </div>
        </section>
    )
}