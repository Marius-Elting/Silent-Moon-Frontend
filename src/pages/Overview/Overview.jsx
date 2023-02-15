import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import "./Overview.scss"
import AppHeadline from '../../components/AppHeadline/AppHeadline';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx';
import Searchbar from '../../components/Searchbar/Searchbar';
import { PlayBtn } from '../../assets/img';
import { Link, useParams } from 'react-router-dom';


const Overview = () => {

    const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const params = useParams().type;
    const today = new Date();
    const month = monthsArray[today.getMonth()];
    const day = today.getDate();

    return (
        <div>
            <AppHeadline />
            <h2>{params}</h2>
            <h3>{params === "yoga" ? "Find your inner zen from anywhere." : "Audio-only meditation techniques to help you minimize your screen time and practice on the go."}</h3>
            <CategoryFilter />
            <Searchbar />
            <section>
                <article>
                    <h4>Daily Calm</h4>
                    <p>{`${month} ${day} • PAUSE PRACTICE`}</p>
                </article>
                <article>
                    <Link><img src={PlayBtn} alt="Play Button" /></Link>
                </article>
            </section>

            <Navbar />
        </div>
    )
}

export default Overview
