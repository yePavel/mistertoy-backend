
import express from 'express'
import { addReview, getReviews } from './review.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

export const reviewRoutes = express.Router()

reviewRoutes.get('/', getReviews)
reviewRoutes.post('/', requireAuth, addReview)
// reviewRoutes.delete('/:id', removeReview)

