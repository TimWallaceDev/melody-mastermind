import express from 'express'

export const userRouter = express.Router()

import { createUser, checkUsername } from '../controllers/user-controller.js'

//create user
userRouter.route("/").post(createUser)
userRouter.route("/check").post(checkUsername)