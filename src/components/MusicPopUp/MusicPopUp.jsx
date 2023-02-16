import React, { useState } from 'react';
import TopNav from '../TopNav/TopNav';
import './MusicPopUp.scss';
import AudioPlayer from 'react-h5-audio-player';



const MusicPopUp = ({ showPopup, setShowPopup, handleClosePopup }) => {

    const toggleButton = () => {
        setShowPopup(prev => !prev);
    }

    return (
        <section className='musicPopUpSection'>
            <TopNav symbol='arrow' handleClosePopup={handleClosePopup} />
            <AudioPlayer className='audioPlayer'></AudioPlayer>
        </section>
    )
}

export default MusicPopUp
