import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .post("http://localhost:9898/login", {
        code,
      })
      .then(res => {
        setAccessToken(res.data.accessToken)
        sessionStorage.setItem("accessToken", res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        // window.history.pushState({}, null, "/music")
        navigate("/music")
      })
      .catch((err) => {
        // window.location = "/music"
        console.log(err)
      })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      console.log("REFRESHING")
      axios
        .post("http://localhost:9898/refresh", {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          sessionStorage.setItem("accessToken", res.data.accessToken)
          setExpiresIn(res.data.expiresIn)

        })
        .catch((err) => {
          console.log(err)
          // window.location = "/music"
        })
    }, (expiresIn - 60) * 1000)
    console.log(expiresIn)
    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}
