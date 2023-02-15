import React from 'react';
import './Stats.scss';
import { Heart, Headphones } from '../../assets/img';

const Stats = () => {
    return (
        <article className='stats'>
            <div>
                <img src={Heart}></img>
                <p className='stats'>24.234 Favorites</p>
            </div>
            <div>
                <img src={Headphones}></img>
                <p>34.234 Listening</p>
            </div>
        </article>
    )
}

export default Stats
