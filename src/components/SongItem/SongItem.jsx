import React, { useState } from 'react';
import './SongItem.scss';
import { Playlist } from '../../assets/img';
import MusicPopUp from '../MusicPopUp/MusicPopUp';


const SongItem = (props) => {
    const [showPopup, setShowPopup] = useState(false);

    const toggleButtonHandler = () => {
        setShowPopup(prev => !prev);
    };


    return (
        <div className='songItem'>
            <button onClick={toggleButtonHandler}>
                <img src={Playlist} alt='PlayButton'></img>
            </button>
            {showPopup && <MusicPopUp showPopup={showPopup} toggleButtonHandler={toggleButtonHandler} />}
            <article>
                <h3>{props.playlistName}</h3>
                <p>{props.artist}</p>
            </article>
        </div>
    )
}

export default SongItem;
