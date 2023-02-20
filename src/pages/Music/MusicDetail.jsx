import React from 'react';
import "./MusicDetail.scss";
import AppHeadline from "../../components/AppHeadline/AppHeadline.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import ReturnBtn from '../../components/ReturnBtn/ReturnBtn';
import SongItem from '../../components/SongItem/SongItem';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { uiActions } from '../../store/ui-slice';
import { Upwards } from '../../assets/img';



const MusicDetail = () => {

    const dispatch = useDispatch();
    const [dataCategories, setDataCategories] = useState([]);
    const user = useSelector(state => state.user);
    const loadingComponent = useSelector(state => state.ui.loadingComponent);

    const params = useParams().id;
    const [singlePlaylist, setSinglePlaylist] = useState([]);
    const [tracks, setTracks] = useState([]);

    const [showNumber, setshowNumber] = useState(20);

    useEffect(() => {
        dispatch(uiActions.setLoadingComponent("overview"));
        async function getSinglePlaylist() {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/getsingleplaylist/${params}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                credentials: "include",

            });
            const dataPlaylist = await response.json();
            setSinglePlaylist(dataPlaylist[0]);
            setTracks(dataPlaylist[0].trackList);

            console.log("singleplaylist", dataPlaylist[0]);
            console.log("singleplaylist TrackList", dataPlaylist[0].trackList);

            dispatch(uiActions.unsetLoadingComponent("overview"));

        }
        getSinglePlaylist();
    }, []);

    console.log(showNumber);


    return (
        <div className='musicDetailPage'>
            <AppHeadline />
            <ReturnBtn link="/music" />

            <h2>{singlePlaylist.playlistName}</h2>
            <h4>Playlist</h4>
            <h4>Breathe ~ Sense ~ Feel ~ Transcend</h4>

            <section>

                {
                    tracks?.slice(0, showNumber).map((element, index) => {
                        return (

                            <SongItem key={index} playlist={singlePlaylist.trackList} playlistName={element.title} artist={element.artist.slice(0, 25) + " ..."} preview={element.preview} />
                        );


                    })
                }
                {tracks.length > 0 && <button className="musicDetailShowMore" type="button" onClick={() => setshowNumber(prev => prev + 20)}> ... </button>}

                {tracks.length > 10 && <button className='musicDetailUpBtn' onClick={() => window.scrollTo({ top: 0 })}><img src={Upwards} alt="yoga pose indicating upwards movement"></img></button>}


            </section>

            <Navbar page="musicdetail" />

        </div>
    );
};

export default MusicDetail;