import "./MobileNavbar.scss"
import { Link } from "react-router-dom"
import { Logout } from "../Logout/Logout"
import home from "../../assets/icons/home.svg"
import leaderboard from "../../assets/icons/leaderboard-100.png"
import account from "../../assets/icons/account-100.png"

export function MobileNavbar() {

    return (
        <nav className='navbar'>
            <ul className="navbar__items">

                <li className="navbar__item">
                    <Link to={"/"} className="navbar__link">
                        <img className="navbar__icon" src={home} alt="home icon" />
                        <span className="navbar__text">Playlists</span>
                    </Link>
                </li>

                <li className="navbar__item">
                    <Link to={"/leaderboards"} className="navbar__link">
                        <img className="navbar__icon" src={"/melody-mastermind/" + leaderboard} alt="leaderboard icon" />
                        <span className="navbar__text"> Leaderboards</span>
                    </Link>
                </li>

                <li className="navbar__item">
                    <Link to={`/account`} className="navbar__link">
                        <img className="navbar__icon" src={account} alt="account icon" />
                        <span className="navbar__text">Account</span>
                    </Link>
                </li>

                <Logout className="navbar__item" location="navbar"/>
                
            </ul>
        </nav>
    )
}