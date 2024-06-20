import express from 'express'
import { getToken } from "../controllers/token-controller.js"

export const tokenRouter = express.Router()

tokenRouter.route("/").get(getToken)