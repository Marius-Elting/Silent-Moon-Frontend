import React, { useState } from 'react';
import TopNav from '../TopNav/TopNav';
import './MusicPopUp.scss';
import AudioPlayer from 'react-h5-audio-player';



const MusicPopUp = ({ toggleButtonHandler, preview }) => {

    const playerSettings = {
        src: preview,
        autoPlay: false,
        loop: false,
        mute: false,
        volume: 0.8,
        showJumpControls: true,
        showDownloadProgress: true,
        progressUpdateInterval: 500,
    };

    return (
        <section className='musicPopUpSection'>
            <TopNav symbol='arrow' handleClickFunction={toggleButtonHandler} />
            <AudioPlayer className='audioPlayer' {...playerSettings}></AudioPlayer>
        </section>
    )
}

export default MusicPopUp
