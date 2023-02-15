import React, { useEffect, useState } from 'react';
import './Detail.scss';
import { useParams } from 'react-router-dom';
import TopNav from '../../components/TopNav/TopNav';
import Stats from '../../components/Stats/Stats';
import SongItem from '../../components/SongItem/SongItem';
import { DetailYogaImg, YogaPlayButton } from '../../assets/img';
import Navbar from '../../components/Navbar/Navbar';
import MusicPopUp from '../../components/MusicPopUp/MusicPopUp';

const Detail = () => {
    let { id } = useParams();
    const [data, setData] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    // console.log(data);
    // console.log(id);
    console.log(playlist);

    useEffect(() => {
        async function getData() {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/getsingleexercise/${id}`);
            const data = await response.json();
            setData(data);
        }
        getData();
    }, []);


    useEffect(() => {
        async function getPlaylist() {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/getallplaylists/`);
            const playlist = await response.json();
            setPlaylist(playlist);
        }
        getPlaylist();
    }, []);


    return (
        <section className='detailSection'>
            <TopNav symbol='arrow' />

            {
                false ? (
                    <section className='detailYoga'>
                        <article className='detailYogaBackground'>
                            <img src={data[0]?.image.url}></img>
                        </article>
                        <div className='detailDescription'>
                            <h2>{data[0]?.name}</h2>
                            <p className='detailUppercase'>{data[0]?.level}</p>
                            <p>{data[0]?.description}</p>
                        </div>
                        <Stats />
                        <Navbar />
                    </section>
                ) : <section className='detailMeditation'>
                    <article className='detailMeditationBackground'>
                        <img src={data[0]?.image.url}></img>
                    </article>
                    <div className='detailMeditationDescription'>
                        <h2>{data[0]?.name}</h2>
                        <p className='detailUppercase'>{data[0]?.level}</p>
                        <p>{data[0]?.description}</p>
                    </div>
                    <Stats />
                    <div className='detailPlaylist'>
                        <h3>Playlist</h3>
                    </div>
                    <SongItem />
                    <Navbar />
                </section>
            }
        </section >
    )
}

export default Detail
