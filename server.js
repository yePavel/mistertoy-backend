
import express from 'express'

import { loggerService } from './services/logger.service.js'
import { toyService } from './services/toy.service.js'

const app = express()

// **************** Toys API ****************:
// GET toys

app.get('/api/toy', (req, res) => {
    const { filterBy = {} } = req.query
    toyService.query(filterBy)
        .then(toys => {
            res.send(toys)
        })
        .catch(err => {
            loggerService.error('Cannot load toys', err)
            res.status(404).send('NOT FOUND')
        })
})

app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then(toy => {
            res.send(toy)
        })
        .catch(err => {
            loggerService.error('Cannot get toy', err)
            res.status(400).send(err)
        })
})

app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.remove(toyId)
        .then(toy => {
            res.send(toy)
        })
        .catch(err => {
            loggerService.error('Cannot delete toy', err)
            res.status(400).send(err)
        })
})

app.post('/api/toy', (req, res) => {
    const { name, price } = req.body
    const toy = {
        name,
        price: +price
    }
    toyService.save(toy)
        .then(savedToy => {
            res.send(savedToy)
        })
        .catch(err => {
            loggerService.error('Cannot add toy', err)
            res.status(400).send('Cannot add toy')
        })
})

app.put('/api/toy', (req, res) => {
    const { name, price, _id, labels } = req.body
    const toy = {
        _id,
        name,
        price: +price,
        labels,
    }
    toyService.save(toy)
        .then(savedToy => {
            res.send(savedToy)
        })
        .catch(err => {
            loggerService.error('Cannot update toy', err)
            res.status(400).send('Cannot update toy')
        })
})

const port = 3030
app.listen(port, () => {
    loggerService.info(`Server listening on port: ${port}`)
    console.log(`Server listening on port: ${port}`)
})