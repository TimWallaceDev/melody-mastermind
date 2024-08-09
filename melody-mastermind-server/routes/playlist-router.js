import express from 'express'
import { getPlaylists } from '../controllers/playlist-controller.js'
export const playlistRouter = express.Router()

playlistRouter.route("/").get(getPlaylists)