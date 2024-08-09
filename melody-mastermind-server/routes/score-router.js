import express from 'express'
import { playlistScores, postScore, allScores } from '../controllers/score-controller.js'

export const scoreRouter = express.Router()

scoreRouter.route("/:playlist").get(playlistScores)

scoreRouter.route("/").post(postScore)

scoreRouter.route("/").get(allScores)
