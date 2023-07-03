import React, { useEffect, useState } from 'react';
import './Profile.scss';
import Navbar from '../../components/Navbar/Navbar';
import AppHeadline from '../../components/AppHeadline/AppHeadline';
import Searchbar from '../../components/Searchbar/Searchbar';
import { ProfileUser, ProfileIcon, LogoutButton } from '../../assets/img';
import { useDispatch, useSelector } from 'react-redux';
import { logoutuser } from '../../store/user-actions';
import SmallCard from '../../components/SmallCard/SmallCard';
import { uiActions } from '../../store/ui-slice';
import Alert from '../../components/Alert/Alert';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router-dom';


const Profile = () => {
    const user = useSelector(state => state.user?.userData?.firstname) || "Logging Out...";
    const [visibility, setVisibility] = useState("Hidden");
    const [userFavorites, setUserFavorites] = useState([]);
    const dispatch = useDispatch();
    const alertIsVisible = useSelector(state => state.ui.alertIsVisible);
    const userData = useSelector(state => state.user.userData);
    const loadingComponent = useSelector(state => state.ui.loadingComponent);

    const testUser = {
        id: userData?._id,
        type: "all"
    };




    useEffect(() => {
        dispatch(uiActions.setLoadingComponent("profile"));
        if (userData === null) {
            return;
        }
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
            setUserFavorites(getUser);

            dispatch(uiActions.unsetLoadingComponent("profile"));
        }

        getFavorites();
    }, []);



    return (
        <section className='profileSection'>
            <AppHeadline />
            {alertIsVisible && <Alert />}

            <article className='profileUser'>
                <img src={ProfileIcon} alt='User'></img>
                <p>{user}</p>
            </article>

            <Searchbar visibility={visibility} setVisibility={setVisibility} page="profile" />
            <img className='profileLogout' src={LogoutButton} onClick={() => { dispatch(logoutuser()); }} alt="Logout Button" />
            <article className='profileYoga'>
                <h4>Favourite Yoga Sessions</h4>
                {loadingComponent.includes("profile") && userFavorites.length === 0 && <Loading center={true} />}
                {userData !== null ?

                    <article>
                        {
                            userFavorites?.favorites?.filter(element => element.type === 'yoga').map((element, key) => {
                                return (
                                    <SmallCard key={key} image={element.image.imagePath.url} name={element.name} level={element.level} duration={element.duration} link={`/detail/yoga/${element._id}`} />
                                );
                            })
                        }
                    </article> :
                    <article><p>user not logged in </p></article>
                }
            </article>

            <article className='profileMeditation'>
                <h4>Favourite Meditations</h4>
                {loadingComponent.includes("profile") && userFavorites.length === 0 && <Loading center={true} />}

                {userData !== null ?

                    <article>

                        {
                            userFavorites?.favorites?.filter(element => element.type === 'meditation').map((element, key) => {
                                return (
                                    <SmallCard key={key} image={element.image.url} name={element.name} level={element.level} duration={element.duration} link={`/detail/meditation/${element._id}`} />
                                );
                            })
                        }
                    </article> :
                    <article><p>user not logged in </p></article>
                }
            </article>
            <Link className='profileRemindmeChanger' to="/remindme" >Change your reminder settings</Link>
            <Navbar page="profile" />
        </section>
    );
};

export default Profile;
