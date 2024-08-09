import express from 'express'
import { getAccountInfo, login, signup, guest } from '../controllers/account-controller.js'

export const accountRouter = express.Router()



accountRouter.route("/login").post(login)

accountRouter.route("/signup").post(signup)

accountRouter.route("/guest").post(guest)

accountRouter.route("/").get(getAccountInfo)