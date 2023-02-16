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
const Detail = () => {
    const user = useSelector(state => state.user);
    let { id, playlist } = useParams();
    const [singleplaylist, setSinglePlaylist] = useState([]);
    const [data, setData] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.ui.isLoading);
    const handleBackButton = () => {
        navigate(-1);

    };


    useEffect(() => {
        dispatch(uiActions.showLoading());
        async function getData() {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/getsingleexercise/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                credentials: "include",
            });
            const data = await response.json();
            setData(data[0]);
            dispatch(uiActions.unShowLoading());
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
            console.log("singleplaylist", dataPlaylist[0]);

        }
        getSinglePlaylist();
    }, []);


    return (
        <section className='detailSection'>
            <TopNav symbol='arrow' handleClickFunction={handleBackButton} />
            {isLoading && <Loading center={true} customStyle={{
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%"
            }} />}
            {
                // data?.filter(element => element.type === 'meditation')
                data?.type === "yoga" ?
                    <section className='detailYoga'>
                        <article className='detailYogaBackground'>
                            <img src={data?.image?.url} alt={data?.name}></img>
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
                            singleplaylist.trackList?.slice(0, 10).map((element, key) => {
                                return (

                                    <SongItem key={key} playlistName={element.title} artist={element.artist.slice(0, 25) + " ..."} />
                                )

                            })
                        }
                        <Navbar />
                    </section>
            }
        </section>
    );
};

export default Detail;
