import React, { useRef } from 'react';
import './player.scss';
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsSkipEndCircleFill, BsFillSkipEndCircleFill } from 'react-icons/bs';

const Player = ({ audioElem, isplaying, setisplaying, currentSong, setCurrentSong, skiptoNext, songs }) => {
    const rangeRef = useRef();
    const clickRef = useRef();

    const PlayPause = () => {
        setisplaying(!isplaying);

    };


    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const divprogress = offset / width * 100;
        audioElem.current.currentTime = divprogress / 100 * currentSong.length;
    };

    const skipBack = async () => {
        const index = songs.findIndex(x => x.title == currentSong.title);
        if (index == 0) {
            setCurrentSong(songs[songs.length - 1]);
        }
        else {
            setCurrentSong(songs[index - 1]);
        }
        audioElem.current.currentTime = 0;
        await isplaying.url;
        await audioElem.current.play();


    };

    const changeVol = (e) => {
        audioElem.current.volume = e.target.value / 10;
    };

    return (
        <div className='player_container'>
            <div className="title">
                <p>{currentSong.title}</p>
            </div>
            <div className="navigation">
                <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
                    <div className="seek_bar" style={{ width: `${currentSong.progress + "%"}` }}></div>
                </div>
            </div>
            <div className="controls">
                <BsFillSkipStartCircleFill className='btn_action' onClick={skipBack} />
                {isplaying ? <BsFillPauseCircleFill className='btn_action pp' onClick={PlayPause} /> : <BsFillPlayCircleFill className='btn_action pp' onClick={PlayPause} />}
                <BsFillSkipEndCircleFill className='btn_action' onClick={skiptoNext} />
            </div>
            <input onChange={changeVol} defaultValue={5} type={"range"} max="10" min="0" ref={rangeRef}></input>
        </div>

    );
};

export default Player;