import { ObjectId } from "mongodb"
import { dbService } from "../../services/db.service.js"
import { loggerService } from "../../services/logger.service.js"

export const reviewService = { query, remove, add }

async function query(filterBy = {}) {

    const criteria = {}
    if (filterBy.byUserId) {
        criteria.byUserId = ObjectId.createFromHexString(filterBy.byUserId)
    }
    if (filterBy.toyId) {
        criteria.toyId = ObjectId.createFromHexString(filterBy.toyId)
    }

    try {
        const collection = await dbService.getCollection('review')
        var reviews = await collection.aggregate([
            { $match: criteria },
            {
                $lookup: {
                    localField: 'byUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser',
                },
            },
            {
                $unwind: '$byUser',
            },
            {
                $lookup: {
                    localField: 'toyId',
                    from: 'toy',
                    foreignField: '_id',
                    as: 'toy',
                },
            },
            {
                $unwind: '$toy',
            },
        ]).toArray()

        reviews = reviews.map(review => {
            review.byUser = {
                _id: review.byUser._id,
                username: review.byUser.username,
                fullname: review.byUser.fullname,
            }
            review.toy = {
                _id: review.toy._id,
                name: review.toy.name,
                price: review.toy.price
            }
            review.createdAt = review._id.getTimestamp()
            delete review.byUser.password
            delete review.byUserId
            delete review.toyId
            return review
        })

        return reviews

    } catch (err) {
        loggerService.error('cannot find reviews', err)
        throw err
    }
}

async function add(review, byUser) {
    try {
        const reviewToAdd = {
            byUserId: ObjectId.createFromHexString(byUser._id),
            toyId: ObjectId.createFromHexString(review.toyId),
            txt: review.txt,
        }
        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        return reviewToAdd

    } catch (err) {
        loggerService.error('cannot add review', err)
        throw err
    }
}

async function remove(reviewId) {
    console.log("🚀 ~ remove ~ reviewId:", reviewId)
    try {
        const criteria = {
            _id: ObjectId.createFromHexString(reviewId)
        }
        const collection = await dbService.getCollection('review')
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        loggerService.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}

