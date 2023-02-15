import React from 'react';
import './Navbar.scss';
import { NavHome, NavMeditate, NavYoga, NavMusic, NavProfile, NavYogaActive, NavMeditateActive, NavHomeActive, NavMusicActive, NavProfileActive } from '../../assets/img/';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = ({ page }) => {
    const user = useSelector(state => state.user?.userData?.firstname || "Profile")

    return (
        <nav className='navBarWrapper'>
            <Link to='/overview/yoga'>
                <div>
                    <img src={page === "yoga" ? NavYogaActive : NavYoga} className={page === "yoga" ? "active" : ""} alt='Moon Icon'></img>
                    <p>Yoga</p>
                </div>
            </Link>
            <Link to='/overview/meditate'>
                <div>
                    <img src={page === "meditate" ? NavMeditateActive : NavMeditate} className={page === "meditate" ? "active" : ""} alt='Meditate Icon'></img>
                    <p>Meditate</p>
                </div>
            </Link>
            <Link to='/home'>
                <div>
                    <img src={page === "home" ? NavHomeActive : NavHome} className={page === "home" ? "active" : ""} alt='Home Icon'></img>
                    <p>Home</p>
                </div>
            </Link>
            <Link to='/music'>
                <div>
                    <img src={page === "music" ? NavMusicActive : NavMusic} className={page === "music" ? "active" : ""} alt='Music Icon'></img>
                    <p>Music</p>
                </div>
            </Link>
            <Link to='/profile'>
                <div>
                    <img src={page === "profile" ? NavProfileActive : NavProfile} className={page === "profile" ? "active" : ""} alt='Profile Icon'></img>
                    <p>{user}</p>
                </div>
            </Link>
        </nav>

    )
}

export default Navbar
