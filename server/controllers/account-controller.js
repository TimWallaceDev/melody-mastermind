import Knex from "knex";
import Knexfile from "../knexfile.js";
const knex = Knex(Knexfile.development);
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const playlists = await knex("playlists")

export async function signup(req, res) {
    const { username, email, password } = req.body

    if (!username || !password || !email) {
        return res.status(400).send("Enter required fields!");
    }

    const newUser = {
        username,
        email,
        //encrypt password
        password: bcrypt.hashSync(password)
    }

    //save user to database
    try {
        await knex("users").insert(newUser)
        res.status(201).send("account has been created")
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

export async function login(req, res) {
    const { username, password } = req.body

    //check that all fields are present
    if (!username || !password) {
        res.status(400).send("please fill in all fields")
    }

    //lookup username in database
    const user = await knex("users").where({ username }).first()

    //make sure that user exists
    if (!user) {
        console.log("user does not exist")
        return res.status(400).send("Incorrect Login Information")
    }
    console.log("user seems to exist")

    //make sure that password matches 
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).send("Incorrect Login Information");
    }

    //generate token
    const secret = process.env.JWT_SECRET

    const token = jwt.sign({ username }, secret)
    //sent JWT
    res.status(200).json(token)
}

export async function guest(req, res) {

    // create unique username
    let randomUsername;
    let userTaken = false;
    do {
        const randomInt = Math.floor(Math.random() * 9999)
        randomUsername = `guest${randomInt}`

        //check that username is not already taken
        const user = await knex("users").where({ username: randomUsername })
        if (user.length > 0) {
            userTaken = true;
        }
    }
    while (userTaken)
    const newUser = {
        username: randomUsername
    }

    //save guest to database
    try {
        await knex("users").insert(newUser)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }

    //generate token
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({ username: randomUsername }, process.env.JWT_SECRET)

    //sent JWT
    res.status(200).json({ token, username: randomUsername })
}

export async function getAccountInfo(req, res) {
    //get user Id
    const { authorization } = req.headers
    // Parse out the bearer token
    const JWT = authorization.split(" ")[1];

    //double check that username and token exists
    if (!JWT) {
        return res.status(400).send("something went wrong")
    }

    // verify the jwt.
    // 'payload' will contain the payload encoded when the jwt was generated (signed) when we logged in.
    // If this part fails to verify, we end up in 'catch' block
    const payload = jwt.verify(JWT, process.env.JWT_SECRET);

    /// we are verified!
    const userId = await knex("users").select("id").where({ username: payload.username }).first()

    //get all scores
    const scores = await knex("scores").select("*")

    //number of games played 
    const userScores = scores.filter(score => score.user_id === userId.id)
    const games_played = userScores.length


    //check that games have been played, if not, return array with placeholders
    if (userScores.length === 0) {
        res.status(200).json({
            games_played: "No Games Played",
            highest_score: 0,
            best_playlist: "N/A",
            most_played: "N/A",
            playlists_played: 0,
            username: payload.username
        })
        return
    }

    //top score
    const highest_scores = userScores.sort((a, b) => a.score < b.score ? 1 : -1)
    const highest_score_obj = highest_scores[0]
    const highest_score = highest_score_obj.score

    //playlist most played
    const playlistCount = {}
    userScores.forEach(score => playlistCount.hasOwnProperty(score.playlist_id) ? playlistCount[score.playlist_id] = playlistCount[score.playlist_id] + 1 : playlistCount[score.playlist_id] = 1)
    let highestValue = 0;
    let highestKey = null;

    for (const [key, value] of Object.entries(playlistCount)) {
        if (value > highestValue) {
            highestValue = value;
            highestKey = key;
        }
    }

    const mostPlayedPlaylistObj = playlists.find(playlist => playlist.id === highestKey)
    const most_played = mostPlayedPlaylistObj["name"]

    //number of playlists played
    const playlists_played = Object.keys(playlistCount).length

    //playlist with highest score
    const best_playlist_id = highest_score_obj.playlist_id
    const best_playlist_obj = playlists.find(playlist => playlist.id === best_playlist_id)
    const best_playlist = best_playlist_obj["name"]

    const information = {
        games_played,
        highest_score,
        best_playlist,
        most_played,
        playlists_played,
        username: payload.username,
        playlistData: playlists
    }
    res.status(200).json(information)
}