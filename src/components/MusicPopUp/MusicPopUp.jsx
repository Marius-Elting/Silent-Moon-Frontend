import React, { useState, useRef } from 'react';
import TopNav from '../TopNav/TopNav';
import './MusicPopUp.scss';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { RHAP_UI } from 'react-h5-audio-player';



const MusicPopUp = ({ toggleButtonHandler, preview, artist, playlistName }) => {


    const playerSettings = {
        header: (
            <div className='headerAudioPlayer'>
                <h3>{playlistName}</h3>
                <p>{artist}</p>
            </div>
        ),
        src: preview,
        progressJumpStep: 5000,
        autoPlay: true,
        loop: false,
        mute: false,
        volume: 0.1,
        showFilledProgress: true,
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
