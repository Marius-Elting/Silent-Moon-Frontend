import React, { useEffect, useState } from 'react';
import './Profile.scss';
import Navbar from '../../components/Navbar/Navbar';
import AppHeadline from '../../components/AppHeadline/AppHeadline';
import Searchbar from '../../components/Searchbar/Searchbar';
import { Duck } from '../../assets/img';
import { useDispatch, useSelector } from 'react-redux';
import SmallCard from '../../components/SmallCard/SmallCard';
import { logoutuser } from '../../store/user-actions';


const Profile = () => {
    const user = useSelector(state => state.user?.userData?.firstname) || "Herbert";
    const [visibility, setVisibility] = useState("Hidden");
    const [userFavorites, setUserFavorites] = useState([]);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData);
    const testUser = {
        id: "63ebf27631ac83f83b95328f",
        type: "all"
    };

    console.log(userFavorites);

    useEffect(() => {
        async function getFavorites() {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/getfavorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(testUser)
            });
            const getUser = await response.json();
            console.log(getUser.favorites);
            setUserFavorites(getUser);

        }
        getFavorites();
    }, []);

    return (
        <section className='profileSection'>
            <AppHeadline />

            <article className='profileUser'>
                <img src={Duck} alt='User'></img>
                <p>{user}</p>
            </article>

            <Searchbar visibility={visibility} setVisibility={setVisibility} />
            <button onClick={() => { dispatch(logoutuser()); }}>LOGOUT</button>
            <article className='profileYoga'>
                <h3>Favourite Yoga Sessions</h3>
                {/* {userFavorites !== [] && userData &&
                    <article>
                        {
                            userFavorites.favorites.filter(element => element.type === 'yoga').map((element, key) => {
                                return (
                                    <SmallCard key={key} image={element.image.url} name={element.name} level={element.level} duration={element.duration} />
                                );
                            })
                        }
                    </article>} */}
            </article>

            <article className='profileMeditation'>
                <h3>Favourite Meditations</h3>
                {/* <div>
                    {
                        userFavorites.favorites.filter(element => element.type === 'meditation').map((element, key) => {
                            return (
                                <SmallCard key={key} image={element.image.url} name={element.name} level={element.level} duration={element.duration} />
                            )
                        })
                    }
                </div> */}
            </article>



            <Navbar page="profile" />
        </section>
    );
};

export default Profile;
