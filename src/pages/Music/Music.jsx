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
        </div>
    )
}

export default Music
