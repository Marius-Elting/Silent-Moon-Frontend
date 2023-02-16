import React, { useState } from 'react';
import './SongItem.scss';
import { Playlist } from '../../assets/img';
import MusicPopUp from '../MusicPopUp/MusicPopUp';


const SongItem = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleButtonClick = () => {
        setShowPopup(prev => !prev);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };


    return (
        <div className='songItem'>
            <button onClick={handleButtonClick}>
                <img src={Playlist} alt='PlayButton'></img>
            </button>
            {showPopup && <MusicPopUp showPopup={showPopup} handleClosePopup={handleClosePopup} />}
            <article>
                <h3>Focus Attention</h3>
                <p>10 MIN</p>
            </article>
        </div>
    )
}

export default SongItem;
