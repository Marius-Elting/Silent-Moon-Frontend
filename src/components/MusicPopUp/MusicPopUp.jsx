import React, { useState } from 'react';
import TopNav from '../TopNav/TopNav';
import './MusicPopUp.scss';
import AudioPlayer from 'react-h5-audio-player';



const MusicPopUp = ({ toggleButtonHandler }) => {

    return (
        <section className='musicPopUpSection'>
            <TopNav symbol='arrow' handleClickFunction={toggleButtonHandler} />
            <AudioPlayer className='audioPlayer'></AudioPlayer>
        </section>
    )
}

export default MusicPopUp
