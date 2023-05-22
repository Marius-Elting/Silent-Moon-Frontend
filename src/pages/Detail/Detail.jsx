import React, { useEffect, useState } from 'react';
import './Detail.scss';
import { useParams, useNavigate } from 'react-router-dom';
import TopNav from '../../components/TopNav/TopNav';
import Stats from '../../components/Stats/Stats';
import SongItem from '../../components/SongItem/SongItem';
import Navbar from '../../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { uiActions } from '../../store/ui-slice';
import Alert from '../../components/Alert/Alert';

import { Upwards } from '../../assets/img';


const Detail = () => {
    const user = useSelector(state => state.user);
    let { id } = useParams();
    const [singleplaylist, setSinglePlaylist] = useState([]);
    const [data, setData] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadingComponent = useSelector(state => state.ui.loadingComponent);
    const alertIsVisible = useSelector(state => state.ui.alertIsVisible);
    const handleBackButton = () => {
        navigate(-1);

    };



    useEffect(() => {
        dispatch(uiActions.setLoadingComponent("detail"));
        async function getData() {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/getsingleexercise/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                credentials: "include",
            });
            const data = await response.json();
            setData(data[0]);
            setTimeout(() => {

                dispatch(uiActions.unsetLoadingComponent("detail"));
            }, 1000);
        }
        getData();
    }, []);


    useEffect(() => {
        async function getSinglePlaylist() {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/getsingleplaylist/${8963496122}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                credentials: "include",

            });
            const dataPlaylist = await response.json();
            setSinglePlaylist(dataPlaylist[0]);
            console.log(dataPlaylist);
        }
        getSinglePlaylist();
    }, []);


    return (
        <section className='detailSection'>
            {alertIsVisible && <Alert />}
            <TopNav data={{ user, item: { id: data?._id, type: data?.type } }} symbol='arrow' handleClickFunction={handleBackButton} />
            {loadingComponent.includes("detail") && !data && <Loading center={true} customStyle={{
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%"
            }} />}
            {data ?
                data?.type === "yoga" ?
                    <section className='detailYoga'>
                        <article className='detailYogaBackground'>
                            <video poster={data.image.imagePath.url} controls={true}>
                                <button>HAHAH</button>
                                <source src={data.image.videoPath.url}></source>
                            </video>
                        </article>
                        <div className='detailDescription'>
                            <h2>{data?.name}</h2>
                            <p className='detailUppercase'>{data?.level}</p>
                            <p>{data?.description}</p>
                        </div>
                        <Stats />
                        <Navbar />
                    </section>
                    : <section className='detailMeditation'>
                        <article className='detailMeditationBackground'>
                            <img src={data?.image?.url} alt={data?.name}></img>
                        </article>
                        <div className='detailMeditationDescription'>
                            <h2>{data?.name}</h2>
                            <p className='detailUppercase'>{data?.level}</p>
                            <p>{data?.description}</p>
                        </div>
                        <Stats />
                        <div className='detailPlaylist'>
                            <h3>Playlist</h3>
                        </div>
                        {
                            singleplaylist.trackList?.slice(0, 10).map((element, index) => {
                                const artist = element.artist.slice(0, 25) + (element.artist.length >= 25 ? " ..." : "");
                                return (
                                    <SongItem playlist={singleplaylist.trackList} key={index} playlistName={element.title} artist={artist} preview={element.preview} />
                                );

                            })
                        }
                        <button className='musicDetailUpBtn' onClick={() => window.scrollTo({ top: 0 })}><img src={Upwards} alt="yoga pose indicating upwards movement"></img></button>
                        <Navbar />
                    </section>
                : null
            }
        </section>
    );
};

export default Detail;
