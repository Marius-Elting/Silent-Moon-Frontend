import React, { useState, useRef, useEffect } from 'react';
import TopNav from '../TopNav/TopNav';
import './MusicPopUp.scss';
// import 'react-h5-audio-player/lib/styles.css';
import Player from '../MusicPlayer/PlayerComp';



const MusicPopUp = ({ toggleButtonHandler, preview, artist, playlistName, playlist }) => {


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
        if (ct >= duration) {

            const a = async () => {
                try {
                    await skiptoNext();
                } catch (err) {
                    await skiptoNext();
                }
            };
            a();
        }
    };

    return (
        <section className='musicPopUpSection'>
            <TopNav data="" symbol='arrow' handleClickFunction={toggleButtonHandler} />
            <div className="AudioWrapper">
                <audio src={currentSong.preview} ref={audioElem} onTimeUpdate={onPlaying} />
                <Player skiptoNext={skiptoNext} songs={songs} setSongs={setSongs} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} />
            </div>

        </section>
    );
};

export default MusicPopUp;
