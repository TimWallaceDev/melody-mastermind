import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { tokenRouter } from "./routes/token-router.js"
import { scoreRouter } from "./routes/score-router.js"
import { userRouter } from './routes/user-router.js'
import { accountRouter } from './routes/account-router.js'
import { playlistRouter } from './routes/playlist-router.js'

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())

app.use("/melody-mastermind/api/token", tokenRouter)

app.use("/melody-mastermind/api/scores", scoreRouter)

app.use("/melody-mastermind/api/users", userRouter)

app.use("/melody-mastermind/api/account", accountRouter)

app.use("/melody-mastermind/api/playlists", playlistRouter)


app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}/melody-mastermind/api`);
})
