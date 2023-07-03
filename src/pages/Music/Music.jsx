<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Dashboard from '../../components/SpotifyAPI/Dashboard'
import Login from '../../components/SpotifyAPI/Login'

const Music = () => {
    const [code, setCode] = useState()
    const codeVar = new URLSearchParams(window.location.search).get("code")

    if (codeVar) {
        sessionStorage.setItem("spotifyCode", codeVar)
    }
    useEffect(() => {
        if (sessionStorage.getItem("spotifyCode") !== "null" && sessionStorage.getItem("spotifyCode") !== undefined) {
            setCode(sessionStorage.getItem("spotifyCode"))
        } else {
            sessionStorage.removeItem("spotifyCode")
        }
    }, [])

    // const code = new URLSearchParams(window.location.search).get("code")

    const params = useParams()

    return (
        <div>
            {/* <div style={{ padding: "56.25% 0 0 0", position: "relative" }}><iframe title="video" src="https://player.vimeo.com/video/157294822?h=919518469b&title=0&byline=0&portrait=0" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script> */}
            <video>
                <source src="https://www.youtube.com/embed/iUISLveqaII" type="video"></source>
            </video>
            {code ? <Dashboard code={code} playlistID={params.playlistid} page={params.playlistid ? "songs" : "playlists"} /> : <Login />}
=======
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
    const dispatch = useDispatch();

    const loadingComponent = useSelector(state => state.ui.loadingComponent);
    const user = useSelector(state => state.user);
    const [allPlaylists, setAllPlaylists] = useState([]);

    useEffect(() => {
        dispatch(uiActions.setLoadingComponent("music"));
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

            dispatch(uiActions.unsetLoadingComponent("music"));
        }
        getSinglePlaylist();
    }, []);

    return (
        <div className='musicPage'>
            <AppHeadline />

            <h2>Music</h2>
            <h4>Playlists</h4>
            <h4>to help you find inner peace and relax</h4>

            {loadingComponent.includes("music") && allPlaylists.length === 0 && <Loading center={true} />}
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
                    );
                })}
            </section>

            <Navbar page="music" />

>>>>>>> main
        </div>
    );
};

export default Music;
