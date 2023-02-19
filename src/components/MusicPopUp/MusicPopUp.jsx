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
    const songIndex = playlist.findIndex(x => x.title == playlistName);
    const [currentSong, setCurrentSong] = useState(playlist[songIndex]);

    const audioElem = useRef();

    useEffect(() => {


        if (isplaying) {
            audioElem.current.play();
        }
        else {
            audioElem.current.pause();
        }


    }, [isplaying]);

    const skiptoNext = async () => {
        const index = songs.findIndex(x => x.title == currentSong.title);

        if (index == songs.length - 1) {
            setCurrentSong(songs[0]);
        }
        else {
            setCurrentSong(songs[index + 1]);
        }

        audioElem.current.currentTime = 0;
        await currentSong.url;
        await audioElem.current.play();

    };

    const onPlaying = () => {
        const duration = audioElem.current.duration;
        const ct = audioElem.current.currentTime;
        setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration });
        let isTruelyPLaying = audioElem.current.currentTime > 0 && !audioElem.current.paused && !audioElem.current.ended
            && audioElem.current.readyState > audioElem.current.HAVE_CURRENT_DATA;
        if (ct >= duration) {
            // setisplaying(prev => !prev);
            // const index = songs.findIndex(x => x.title == currentSong.title);
            // audioElem.current.currentTime = 0;
            // if (index == songs.length - 1) {
            //     setCurrentSong(songs[0]);
            // }
            // else {
            //     setCurrentSong(songs[index + 1]);
            // }
            const a = async () => {
                try {
                    await skiptoNext();
                } catch (err) {
                    await skiptoNext();
                }
            };

            a();

            // await audioElem.current.play();


        }
    };

    return (
        <section className='musicPopUpSection'>
            <TopNav data="" symbol='arrow' handleClickFunction={toggleButtonHandler} />
            {/* <AudioPlayer className='audioPlayer' {...playerSettings}></AudioPlayer> */}
            <div className="AudioWrapper">

                <audio src={currentSong.preview} ref={audioElem} onTimeUpdate={onPlaying} />
                <Player skiptoNext={skiptoNext} songs={songs} setSongs={setSongs} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} />
            </div>

        </section>
    );
};

export default MusicPopUp;
