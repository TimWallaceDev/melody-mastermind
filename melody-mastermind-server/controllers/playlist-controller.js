import Knex from "knex";
import Knexfile from "../knexfile.js";
const knex = Knex(Knexfile.development);


export async function getPlaylists(req, res) {

    try {
        const playlists = await knex('playlists')
            .leftJoin('scores', 'playlists.id', 'scores.playlist_id')
            .select('playlists.id', 'playlists.name', 'playlists.image_url',)
            .count('scores.id as score_count')
            .groupBy('playlists.id', 'playlists.name')
            .orderBy('score_count', 'desc');
        res.status(200).json(playlists)

    } catch (err) {
        console.log(err)
        res.status(500).send("Something has gone awry")
    }


}