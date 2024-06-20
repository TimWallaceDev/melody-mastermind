import Knex from "knex";
import Knexfile from "../knexfile.js";
const knex = Knex(Knexfile.development);

export async function checkUsername(req, res) {
    const { username } = req.body
    try {
        const user = await knex("users").select("*").where({ username: username })
        if (user.length > 0) {
            //username is taken. send response 
            res.status(409).json({ username_available: false })
        } else {
            //username is available. create user
            res.status(201).json({ username_available: true })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


export async function createUser(req, res) {

    const { username } = req.body
    try {
        //lookup user
        const user = await knex("users").select("*").where({ username: username })
        if (user.length > 0) {
            //username is taken. send response 
            res.status(400).json({ username_available: false })
        } else {
            //username is available. create user
            const response = await knex("users").insert({ username })
            res.status(201).send(response)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}