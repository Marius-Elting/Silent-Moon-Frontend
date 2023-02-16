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
    const dispatch = useDispatch()
    const [data, setData] = useState();
    console.log("data", data);
    const user = useSelector(state => state.user?.userData?.firstname)
    const isLoading = useSelector(state => state.ui.isLoading)
    useEffect(() => {
        dispatch(uiActions.showLoading())
        async function getData() {
            try {
                const response = await fetch('https://abschlussprojekt-server.up.railway.app/api/getexercise');
                const data = await response.json();
                setData(data);
                dispatch(uiActions.unShowLoading())
            } catch (err) {
                dispatch(uiActions.unShowLoading())
                dispatch(uiActions.showAlert({
                    type: "error",
                    message: "Database Error",
                    color: "red"
                }))
            }
        }
        getData();
    }, []);



    return (
        <section className='homeSection'>
            <AppHeadline />

            <div className='homeHeaderWrapper'>
                <h2 >Namasté {user}</h2>
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
                        <Link>
                            <button>START</button>
                        </Link>
                    </div>
                </div>

                <div className='homeSingleTileWrapper'>
                    <p className='homeSingleTileHeadline'>Meditation</p>
                    <p className='homeSingleTileLevel'>BEGINNER</p>
                    <div>
                        <p>3-10 MIN</p>
                        <Link >
                            <button>START</button>
                        </Link>
                    </div>
                </div>
            </article>
            <Searchbar />
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
                            )
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
                            )
                        })
                    }
                </article>

            </article>

            <Navbar page="home" />
        </section >
    )
}

export default Home
