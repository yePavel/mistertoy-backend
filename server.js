import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { loggerService } from './services/logger.service.js'

const app = express()

const corsOptions = {
    origin: [
        'http://127.0.0.1:3000',
        'http://localhost:3000',

        'http://localhost:5173',
        'http://127.0.0.1:5173',

        'http://localhost:5174',
        'http://127.0.0.1:5174',
    ],
    credentials: true,
}

app.use(cookieParser()) // for res.cookies
app.use(express.json()) // for req.body
app.use(cors(corsOptions))
app.use(express.static('public'))

// **************** Toys API ****************:

import { toyRoutes } from './api/toy/toy.routes.js'

app.use('/api/toy', toyRoutes)


const port = 3030
app.listen(port, () => {
    loggerService.info(`Server listening on port: ${port}`)
    console.log(`Server listening on port: ${port}`)
})