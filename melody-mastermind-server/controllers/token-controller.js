import axios from 'axios'

export async function getToken(req, res) {
    console.log("token request")

    try {
        const headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    
        //body needs client ID and client secret
        const body = {
            grant_type: "client_credentials",
            client_id: `${process.env.VITE_SPOTIFY_CLIENT_ID}`,
            client_secret: `${process.env.VITE_SPOTIFY_SECRET}`
        }
        //request token from spotify
        let response = await axios.post("https://accounts.spotify.com/api/token", body, headers)
    
        //send token back to client
        res.status(200).send(response.data)
    
    }catch(err){
        console.log(err)
        res.status(500).send("error")
    }
}