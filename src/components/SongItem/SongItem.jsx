import React from 'react';
import './SongItem.scss';
import { Playlist } from '../../assets/img';

const SongItem = () => {
    return (
        <div className='songItem'>
            <img src={Playlist} alt='PlayButton'></img>
            <div>
                <h3>Focus Attention</h3>
                <p>10 MIN</p>
            </div>
        </div>
    )
}

export default SongItem;
