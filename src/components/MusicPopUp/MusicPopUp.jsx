import React, { useState, useRef, useEffect } from 'react';
import TopNav from '../TopNav/TopNav';
import './MusicPopUp.scss';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { RHAP_UI } from 'react-h5-audio-player';
import Player from '../newMusicPlayer/PlayerComp';



const MusicPopUp = ({ toggleButtonHandler, preview, artist, playlistName, playlist }) => {


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

    const [songs, setSongs] = useState(playlist);
    const [isplaying, setisplaying] = useState(true);
    const songIndex = playlist.findIndex(x => x.title == preview.title);
    const [currentSong, setCurrentSong] = useState(playlist[1]);

    const audioElem = useRef();

    useEffect(() => {
        if (isplaying) {
            audioElem.current.play();
        }
        else {
            audioElem.current.pause();
        }
    }, [isplaying]);

    const onPlaying = () => {
        const duration = audioElem.current.duration;
        const ct = audioElem.current.currentTime;
        setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration });
    };

    return (
        <section className='musicPopUpSection'>
            <TopNav data="" symbol='arrow' handleClickFunction={toggleButtonHandler} />
            {/* <AudioPlayer className='audioPlayer' {...playerSettings}></AudioPlayer> */}
            <div className="AudioWrapper">

                <audio src={currentSong.preview} ref={audioElem} onTimeUpdate={onPlaying} />
                <Player songs={songs} setSongs={setSongs} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} />
            </div>

        </section>
    );
};

export default MusicPopUp;
