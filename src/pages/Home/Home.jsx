import React, { useEffect, useState } from 'react';
import './Home.scss';
import AppHeadline from '../../components/AppHeadline/AppHeadline';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import Searchbar from '../../components/Searchbar/Searchbar';
import SmallCard from '../../components/SmallCard/SmallCard';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import Loading from '../../components/Loading/Loading';


const Home = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState();

    const user = useSelector(state => state.user);
    const isLoading = useSelector(state => state.ui.isLoading);

    const [visibility, setVisibility] = useState("Hidden");


    useEffect(() => {
        dispatch(uiActions.showLoading());
        async function getData() {
            try {

                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/getexercise', {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    },
                    credentials: "include",
                });
                const data = await response.json();
                setData(data);
                dispatch(uiActions.unShowLoading());
            } catch (err) {
                dispatch(uiActions.unShowLoading());
                dispatch(uiActions.showAlert({
                    type: "error",
                    message: "Database Error",
                    color: "red"
                }));
            }
        }
        getData();
    }, []);



    return (
        <section className='homeSection'>
            <AppHeadline />

            <div className='homeHeaderWrapper'>
                <h2 >Namasté {user.userData?.firstname}</h2>
                <p>
                    We hope you have a good day
                </p>
            </div>
            <article className='homeTopTilesWrapper'>
                <div className='homeSingleTileWrapper'>
                    <p className='homeSingleTileHeadline'>Healthy Back</p>
                    <p className='homeSingleTileLevel'>BEGINNER</p>
                    <div>
                        <p>3-10 MIN</p>
                        <Link to={`/detail/yoga/63ee8962cdddd46b7f88d18e`}>
                            <button>START</button>
                        </Link>
                    </div>
                </div>

                <div className='homeSingleTileWrapper'>
                    <p className='homeSingleTileHeadline'>Meditation</p>
                    <p className='homeSingleTileLevel'>BEGINNER</p>
                    <div>
                        <p>3-10 MIN</p>
                        <Link to={`/detail/meditation/63ee8a08cdddd46b7f88d18f`}>
                            <button>START</button>
                        </Link>
                    </div>
                </div>
            </article>
            <Searchbar visibility={visibility} setVisibility={setVisibility} />
            <article className='homeRecomended'>
                <p>Recomended Yoga for you</p>
                <article>
                    {isLoading && <Loading center={true} />}

                    {
                        data?.filter(element => element.type === 'yoga').map((element, index) => {
                            return (

                                <Link key={index} to={`/detail/yoga/${element._id}`}>
                                    <SmallCard image={element.image.url} name={element.name} level={element.level} duration={element.duration} />
                                </Link>
                            );
                        })
                    }
                </article>

            </article>

            <article className='homeRecomended'>
                <p>Recomended Meditation for you</p>
                <article>
                    {isLoading && <Loading center={true} />}
                    {
                        data?.filter(element => element.type === 'meditation').map((element, index) => {
                            return (

                                <Link key={index} to={`/detail/meditation/${element._id}`}>
                                    <SmallCard image={element.image.url} name={element.name} level={element.level} duration={element.duration} />
                                </Link>
                            );
                        })
                    }
                </article>
            </article>

            <Navbar page="home" />
        </section>
    );
};


export default Home;
