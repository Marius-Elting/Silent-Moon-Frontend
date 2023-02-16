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
    const [data, setData] = useState();
    console.log(data);
    console.log(id);

    useEffect(() => {
        async function getData() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/getsingleexercise/${id}`);
            const data = await response.json();
            setData(data);
        }
        getData();
    }, []);


    return (
        <section className='detailSection'>
            <TopNav symbol='arrow' />

            {
                true ? (
                    <article className='detailYoga'>
                        <div className='detailYogaBackground'>
                            <img src={YogaPlayButton}></img>
                        </div>
                        <div>
                            <h2>Healthy Back</h2>
                            <p>Beginner</p>
                            <p>Ease the mind into a restful night’s sleep  with these deep, amblent tones.</p>
                        </div>
                        <Stats />
                        <Navbar />
                    </article>
                ) : <article className='meditation'>
                    {/* <div>
                        <img></img>
                        <h2>{data[0].name}</h2>
                        <p>{data[0].level}</p>
                        <p>{data[0].description}</p>
                    </div> */}
                    <Stats />
                    <div>
                        <h3>Playlist</h3>
                        <SongItem />
                        <SongItem />
                        <SongItem />
                    </div>
                </article>
            }



        </section >
    );
};

export default Detail;
