import React from 'react';
import './Stats.scss';
import { Heart, Headphones } from '../../assets/img';

const Stats = () => {
    return (
        <article className='stats'>
            <div>
                <img src={Heart} alt="Heart"></img>
                <p className='stats'>{Math.floor(Math.random() * 10000)} Favorites</p>
            </div>
            <div>
                <img src={Headphones} alt="Headphones"></img>
                <p>{Math.floor(Math.random() * 10000)} Listening</p>
            </div>
        </article>
    );
};

export default Stats;
