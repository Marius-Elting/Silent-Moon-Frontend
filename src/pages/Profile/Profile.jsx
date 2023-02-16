import React from 'react';
import './Profile.scss';
import Navbar from '../../components/Navbar/Navbar';
import AppHeadline from '../../components/AppHeadline/AppHeadline';
import Searchbar from '../../components/Searchbar/Searchbar';
import { Duck } from '../../assets/img';
import { useSelector } from 'react-redux';
import SmallCard from '../../components/SmallCard/SmallCard';


const Profile = () => {
    const user = useSelector(state => state.user?.userData?.firstname) || "Herbert";
    return (
        <section className='profileSection'>
            <AppHeadline />

            <article className='profileUser'>
                <img src={Duck} alt='User'></img>
                <p>{user}</p>
            </article>

            <Searchbar />

            <article className='profileYoga'>
                <h3>Favourite Yoga Sessions</h3>
                <SmallCard />
            </article>

            <article className='profileMeditation'>
                <h3>Favourite Meditations</h3>
                <SmallCard />
            </article>



            <Navbar page="profile" />
        </section>
    )
}

export default Profile
