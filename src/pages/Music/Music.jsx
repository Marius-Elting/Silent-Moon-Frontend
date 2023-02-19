import React, { useEffect } from 'react';
import "./Music.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { uiActions } from '../../store/ui-slice';
import { useState } from 'react';
import AppHeadline from '../../components/AppHeadline/AppHeadline';
import { MusicThumbnail } from '../../assets/img';
import { Link } from 'react-router-dom';



const Music = () => {


    const user = useSelector(state => state.user);
    const [allPlaylists, setAllPlaylists] = useState([]);

    useEffect(() => {
        async function getSinglePlaylist() {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/getallplaylists/`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                credentials: "include",

            });
            const dataPlaylist = await response.json();
            setAllPlaylists(dataPlaylist);
            console.log("singleplaylist", dataPlaylist);

        }
        getSinglePlaylist();
    }, []);

    return (
        <div className='musicPage'>
            <AppHeadline />

            <h2>Music</h2>
            <h4>Playlists</h4>
            <h4>to help you find inner peace and relax</h4>

            <section>
                {allPlaylists.map((playlist, index) => {
                    return (
                        <Link key={index} to={`/musicdetail/${playlist.playlistID}`}>
                            <article>
                                <img src={MusicThumbnail} alt="lotus flower and buddha statue"></img>
                            </article>
                            <article>
                                <h5>{playlist.playlistName}</h5>
                            </article>
                        </Link>
                    )
                })}
            </section>

            <Navbar page="music" />

        </div>
    )
}

export default Music
