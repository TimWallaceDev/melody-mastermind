import "./Home.scss"
import { Playlist } from "../../components/Playlist/Playlist"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { MobileNavbar } from "../../components/MobileNavbar/MobileNavbar"
import { DesktopNavbar } from "../../components/DesktopNavbar/DesktopNavbar"
import { Instructions } from "../../components/Instructions/Instructions"

export function Home() {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [playlists, setPlaylists] = useState(null)
    const [JWT, setJWT] = useState(localStorage.getItem("JWT"))
    const navigateTo = useNavigate()

    useEffect(() => {
        async function getPlaylists(){
            //get playlists from backend server
            try {
                const response = await axios.get(`${backendUrl}/melody-mastermind/api/playlists`)
                setPlaylists(response.data)
            }catch(err){
                console.log(err)
            }
        }
        getPlaylists()
    }, [])

    if (!playlists){
        return <h1> Loading Playlists</h1>
    }
    else if (!JWT){
        navigateTo("/")
    }

    return (
        <>
        <DesktopNavbar/>
        <MobileNavbar/>
        <Instructions/>
        <section className="home">

            <h1>Choose a Playlist</h1>

            <div className="home__playlists">

                {playlists.map(playlist => <Playlist key={playlist.id} playlist={playlist} />)}

            </div>
        </section>
        </>
    )
}