import React, { useEffect, useState } from 'react';
import './Detail.scss';
import { useParams } from 'react-router-dom';
import TopNav from '../../components/TopNav/TopNav';
import Stats from '../../components/Stats/Stats';
import SongItem from '../../components/SongItem/SongItem';
import { DetailYogaImg, YogaPlayButton } from '../../assets/img';
import Navbar from '../../components/Navbar/Navbar';

const Detail = () => {
    let { id } = useParams();
    const [data, setData] = useState([]);
    console.log(data);
    console.log(id);

    useEffect(() => {
        async function getData() {
            const response = await fetch(`https://abschlussprojekt-server.up.railway.app/api/getsingleexercise/${id}`);
            const data = await response.json();
            setData(data);
        }
        getData();
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
                    <SongItem />
                    <SongItem />
                    <Navbar />
                </section>
            }



        </section >
    )
}

export default Detail
