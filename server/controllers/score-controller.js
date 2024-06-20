import Knex from "knex";
import Knexfile from "../knexfile.js";
const knex = Knex(Knexfile.development);

const playlists = await knex("playlists")

export async function playlistScores(req, res){
    const {playlist} = req.params

    try {
        //get scores for individual playlist
        //join table with username
        const scores = await knex("scores").select(
            "scores.id", 
            "playlist_id", 
            "score", 
            "scores.user_id",
            "users.username"
        ).where({playlist_id: playlist}).join("users", "scores.user_id", "users.id")

        //return results to client
        res.status(200).json(scores)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

export async function postScore(req, res){
    const {username, score, playlist_id} = req.body
    try {
        //get user id
        const userArr = await knex("users").select("id").where({username: username})
        const user_id = userArr[0].id
        
        //save score to database
        const response = await knex("scores").insert({user_id: user_id, score, playlist_id: playlist_id})
        const score_id = response[0]
        //send confirmation

        //change to json
        res.status(201).send({id: score_id, playlistId: playlist_id, score: score, user_id: user_id, username: username})
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

export async function allScores(req, res){
    //get all scores from database
    try {
        const scores = await knex("scores").select(
            "scores.id", 
            "playlist_id", 
            "score", 
            "scores.user_id",
            "users.username"
        ).join("users", "scores.user_id", "users.id")
    
        res.status(200).json({scores, playlists})
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
    
}