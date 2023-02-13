import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"

import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
})

export default function Dashboard({ code, page, playlistID }) {

  // sessionStorage.setItem("accessToken", useAuth(code))
  // const accessToken = sessionStorage.getItem("accessToken")
  const aTo = useAuth(code)
  const accessToken = sessionStorage.getItem("accessToken")

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playlists, setPlaylists] = useState()
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")
  const navigate = useNavigate()


  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
    console.log("ACCESTOKEN SET")
  }, [accessToken])

  useEffect(() => {
    if (!playingTrack) return
    axios
      .get("http://localhost:9898/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })

  }, [playingTrack])



  //fetcht nach den Playlists zu Meditation und setzt diese in ein state
  useEffect(() => {


    if (page === "playlists") {

      spotifyApi.searchPlaylists("meditation")
        .then(res => {
          setPlaylists(
            res.body.playlists.items.map(playlist => {

              return {
                artist: playlist.name,
                title: playlist.name,
                uri: playlist.uri,
                albumUrl: playlist.images[0].url,
                id: playlist.id
              }
            })
          )
        })
    } else if (page === "songs") {

      spotifyApi.getPlaylistTracks(playlistID)
        .then(res => {

          setSearchResults(
            res.body.items.map(track => {
              return {
                artist: track.track.artists[0].name,
                title: track.track.name,
                uri: track.track.uri,
                albumUrl: track.track.album.images[2].url
              }
            })
          )
        })
        .catch(err => {

          // window.location = "/music"
        })
    }
  }, [page])

  function chooseTrack(track) {
    setPlayingTrack(track)
  }

  const handlePlaylistClick = (playlist) => {
    navigate(`/music/${playlist.id}`)

  }


  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchPlaylists("meditation")
      .then(res => {
        console.log(res.body)
      })
    spotifyApi.getPlaylistTracks("37i9dQZF1DWZqd5JICZI0u")
      .then(res => console.log(res.body))

    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [])



  return (
    <section>
      {/* <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      /> */}
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {page === "songs" && searchResults && searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {page === "songs" && searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            <p>Nothing to find her</p>
            <Link to="/music" >Go Back</Link>
          </div>
        )}
        {page === "playlists" && playlists && playlists.map(list => (
          <TrackSearchResult
            track={list}
            key={list.uri}
            chooseTrack={handlePlaylistClick}
          />
        ))}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </section>
  )
}
