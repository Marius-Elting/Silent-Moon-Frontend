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
            {showPopup && <MusicPopUp playlist={props.playlist} showPopup={showPopup} toggleButtonHandler={toggleButtonHandler} preview={props.preview} artist={props.artist} playlistName={props.playlistName} />}
            <article>
                <h3>{props.playlistName}</h3>
                <p>{props.artist}</p>
            </article>
        </div>
    );
};

export default SongItem;
