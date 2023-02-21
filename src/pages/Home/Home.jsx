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
import { userActions } from '../../store/user-slice';
import { logoutuser } from '../../store/user-actions';
import Alert from '../../components/Alert/Alert';



const Home = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState();

    const user = useSelector(state => state.user);
    const loadingComponent = useSelector(state => state.ui.loadingComponent);
    const alertShown = useSelector(state => state.ui.alertIsVisible);
    const [visibility, setVisibility] = useState("Hidden");


    useEffect(() => {
        dispatch(uiActions.setLoadingComponent("home"));
        async function getData() {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/getexercise', {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    },
                    credentials: "include",
                });
                const data = await response.json();
                if (data.type === "Error") {
                    dispatch(uiActions.showAlert({
                        type: "error",
                        message: data.message,
                        color: "red"
                    }));
                    setTimeout(() => {
                        dispatch(uiActions.unshowAlert());
                        dispatch(uiActions.unsetLoadingComponent("home"));
                        dispatch(logoutuser());
                    }, 1000);
                } else {
                    console.log(data);
                    setData(data);
                }
                dispatch(uiActions.unshowAlert());
                dispatch(uiActions.clearLoadingCompontent("overview"));

            } catch (err) {
                dispatch(uiActions.unShowLoading());
            }
        }
        getData();
    }, []);



    return (
        <section className='homeSection'>
            {alertShown && <Alert />}
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
                        <Link to={`/detail/yoga/63f493622764ab9ff78b70ba`}>
                            <button>START</button>
                        </Link>
                    </div>
                </div>

                <div className='homeSingleTileWrapper'>
                    <p className='homeSingleTileHeadline'>Meditation</p>
                    <p className='homeSingleTileLevel'>BEGINNER</p>
                    <div>
                        <p>3-10 MIN</p>
                        <Link to={`/detail/meditation/63f4c0217a6844761b2b553f`}>
                            <button>START</button>
                        </Link>
                    </div>
                </div>
            </article>
            <Searchbar visibility={visibility} setVisibility={setVisibility} />
            <article className='homeRecomended'>
                <p>Recomended Yoga for you</p>
                <article>
                    {loadingComponent.includes("home") && !data && <Loading center={true} />}

                    {
                        data?.filter(element => element.type === 'yoga').slice(0, 3).map((element) => {
                            return (
                                <SmallCard key={element._id} image={element.image.imagePath.url} name={element.name} level={element.level} duration={element.duration} link={`/detail/yoga/${element._id}`} />
                            );
                        })
                    }
                    {data && <Link className='homeShowMoreBtn' to="/overview/yoga">
                        <h5>See more</h5>
                    </Link>}
                </article>

            </article>

            <article className='homeRecomended'>
                <p>Recomended Meditation for you</p>
                <article>
                    {loadingComponent.includes("home") && !data && <Loading center={true} />}
                    {
                        data?.filter(element => element.type === 'meditation').slice(0, 3).map((element) => {
                            return (
                                <SmallCard key={element._id} image={element.image.url} name={element.name} level={element.level} duration={element.duration} link={`/detail/meditation/${element._id}`} />
                            );
                        })
                    }
                    {data && <Link className='homeShowMoreBtn' to="/overview/meditate">
                        <h5>See more</h5>
                    </Link>}
                </article>
            </article>

            <Navbar page="home" />
        </section>
    );
};


export default Home;
