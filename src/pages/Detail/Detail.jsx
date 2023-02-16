import React, { useEffect, useState } from 'react';
import './Detail.scss';
import { useParams, useNavigate } from 'react-router-dom';
import TopNav from '../../components/TopNav/TopNav';
import Stats from '../../components/Stats/Stats';
import SongItem from '../../components/SongItem/SongItem';
import Navbar from '../../components/Navbar/Navbar';

const Detail = () => {
    let { id, playlist } = useParams();
    const [singleplaylist, setSinglePlaylist] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleBackButton = () => {
        navigate(-1);
    }

    console.log("playlist", singleplaylist);

    useEffect(() => {
        async function getData() {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/getsingleexercise/${id}`);
            const data = await response.json();
            setData(data[0]);
        }
        getData();
    }, []);

    useEffect(() => {
        async function getSinglePlaylist() {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/getsingleplaylist/${8963496122}`);
            const dataPlaylist = await response.json();
            setSinglePlaylist(dataPlaylist);
            console.log("singleplaylist", dataPlaylist);
        }
        getSinglePlaylist();
    }, []);


    console.log("test", data);
    return (
        <section className='detailSection'>
            <TopNav symbol='arrow' handleClickFunction={handleBackButton} />

            {
                // data?.filter(element => element.type === 'meditation')
                data.type === "yoga" ?
                    <section className='detailYoga'>
                        <article className='detailYogaBackground'>
                            <img src={data?.image?.url}></img>
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
                            <img src={data?.image?.url}></img>
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
                            singleplaylist.slice(0, 10).map((element, key) => {
                                return (
                                    <SongItem />
                                )
                            })
                        }
                        <Navbar />
                    </section>
            }
        </section >
    );
};

export default Detail;
