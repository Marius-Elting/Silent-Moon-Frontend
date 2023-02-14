import React from 'react';
import { useParams } from 'react-router-dom';
import TopNav from '../../components/TopNav/TopNav';
import Stats from '../../components/Stats/Stats';
import { Playlist } from '../../assets/img';
import SongItem from '../../components/SongItem/SongItem';

const Detail = () => {
    let { type, id } = useParams();


    return (
        <section className='detailSection'>
            <TopNav symbol='arrow' />

            {
                false ? (
                    <article className='yoga'>
                        <div>
                            <p>Video</p>
                            <h2>Überschrift</h2>
                            <p>Level</p>
                            <p>Description</p>
                        </div>
                        <Stats />
                    </article>
                ) : <article className='meditation'>
                    <div>
                        <p>Video</p>
                        <h2>Überschrift</h2>
                        <p>Level</p>
                        <p>Description</p>
                    </div>
                    <Stats />
                    <div>
                        <h3>Playlist</h3>
                        <SongItem />
                        <SongItem />
                        <SongItem />
                    </div>
                </article>
            }



        </section>
    )
}

export default Detail
