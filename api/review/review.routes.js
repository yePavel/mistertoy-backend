
import express from 'express'
import { addReview, deleteReview, getReviews } from './review.controller.js'
import { requireAdmin, requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'

export const reviewRoutes = express.Router()

reviewRoutes.get('/', log, getReviews)
reviewRoutes.post('/', log, requireAuth, addReview)
reviewRoutes.delete('/:reviewId', requireAdmin, deleteReview)

