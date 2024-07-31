import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { loggerService } from './services/logger.service.js'
import { toyService } from './services/toy.service.js'

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

// app.delete('/api/toy/:toyId', (req, res) => {
//     const { toyId } = req.params
//     toyService.remove(toyId)
//         .then(toy => {
//             res.send(toy)
//         })
//         .catch(err => {
//             loggerService.error('Cannot delete toy', err)
//             res.status(400).send(err)
//         })
// })

// app.post('/api/toy', (req, res) => {
//     const { name, price, labels } = req.body
//     const toy = {
//         name,
//         price: +price,
//         labels
//     }
//     toyService.save(toy)
//         .then(savedToy => {

//             res.send(savedToy)
//         })
//         .catch(err => {
//             loggerService.error('Cannot add toy', err)
//             res.status(400).send('Cannot add toy')
//         })
// })

// app.put('/api/toy', (req, res) => {
//     const { name, price, _id, labels } = req.body
//     const toy = {
//         _id,
//         name,
//         price: +price,
//         labels,
//     }
//     toyService.save(toy)
//         .then(savedToy => {
//             res.send(savedToy)
//         })
//         .catch(err => {
//             loggerService.error('Cannot update toy', err)
//             res.status(400).send('Cannot update toy')
//         })
// })

const port = 3030
app.listen(port, () => {
    loggerService.info(`Server listening on port: ${port}`)
    console.log(`Server listening on port: ${port}`)
})