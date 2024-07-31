import express from 'express'
import { addToy, getToyById, getToys, removeToy, updateToy } from './toy.controller.js'

export const toyRoutes = express.Router()

toyRoutes.get('/', getToys)
toyRoutes.get('/:toyId', getToyById)
toyRoutes.post('/', addToy)
toyRoutes.put('/', updateToy)
toyRoutes.delete('/:toyId', removeToy)
