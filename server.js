import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import { loggerService } from './services/logger.service.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(cookieParser()) // for res.cookies
app.use(express.json()) // for req.body
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
    console.log('__dirname: ', __dirname)
} else {
    // Configuring CORS
    // Make sure origin contains the url 
    // your frontend dev-server is running on
    const corsOptions = {
        origin: [
            'http://127.0.0.1:5173',
            'http://localhost:5173',

            'http://127.0.0.1:3030',
            'http://localhost:3030',
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}
// **************** Toys API ****************:

import { toyRoutes } from './api/toy/toy.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'
import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.js'
import { reviewRoutes } from './api/review/review.routes.js'

app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/toy', toyRoutes)
app.use('/api/user', userRoutes)
app.use('/api/review', reviewRoutes)


const port = 3030

app.listen(port, () => {
    loggerService.info(`Server listening on port: ${port}`)
    console.log(`Server listening on port: ${port}`)
})