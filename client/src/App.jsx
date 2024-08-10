import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import { Home } from "./pages/Home/Home"
import { Game } from './pages/Game/Game';
import { Account } from './pages/Account/Account';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Leaderboards } from './pages/Leaderboards/Leaderboards';
import { Signup } from './pages/Signup/Signup';
import { Login } from './pages/Login/Login';

function App() {
  const [token, setToken] = useState(null)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    //get token to use for authorization
    async function getToken() {

      //request token from backend
      let response = await axios.get(`${backendUrl}/melody-mastermind/api/token`)
      //save token in state
      setToken(response.data.access_token)
    }

    getToken()

  }, [])

  if (!token) {
    return (
      <h1>Loading token</h1>
    )
  }

  return (

    <BrowserRouter basename='/melody-mastermind'>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/playlists"} element={<Home />} />
        <Route path={"/game/:playlistId"} element={<Game token={token} />} />
        <Route path={"/leaderboards"} element={<Leaderboards />} />
        <Route path={"/account"} element={<Account />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
