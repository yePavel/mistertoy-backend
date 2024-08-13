
import { ObjectId } from "mongodb";
import { loggerService } from "../../services/logger.service.js";
import { reviewService } from "./review.service.js";

export async function getReviews(req, res) {
    const filterBy = {
        byUserId: req.query.byUserId || '',
        toyId: req.query.toyId || ''
    }
    try {
        const reviews = await reviewService.query(filterBy)
        res.send(reviews)
    } catch (err) {
        loggerService.error('Failed to get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

export async function addReview(req, res) {
    const { loggedinUser } = req

    try {
        const review = await reviewService.add(req.body, loggedinUser)
        res.send(review)
    } catch (err) {
        loggerService.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

export async function deleteReview(req, res) {
    const { reviewId } = req.params
    try {
        const deletedCount = await reviewService.remove(reviewId)
        res.send({ msg: `deleted successfully ${deletedCount}`, })
    } catch (err) {
        loggerService.error(`Failed to delete review ${reviewId}`, err)
        res.status(400).send({ err: 'Failed to delete review' })
        throw err
    }
}
