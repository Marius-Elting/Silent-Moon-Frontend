import React from 'react';
import TopNav from '../TopNav/TopNav';
import './MusicPopUp.scss';
import { PauseButton } from '../../assets/img';
import AudioPlayer from 'react-h5-audio-player';



const MusicPopUp = () => {

    return (
        <section className='musicPopUpSection'>
            <TopNav />
            <AudioPlayer className='audioPlayer'></AudioPlayer>
        </section>
    )
}

export default MusicPopUp
