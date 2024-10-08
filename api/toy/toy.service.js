import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'

import { loggerService } from '../../services/logger.service.js'

export const toyService = {
    query,
    getById,
    save,
    remove,
}

async function query(filterBy = { txt: '', maxPrice: Infinity }) {
    try {
        filterBy.maxPrice == 0 ? filterBy.maxPrice = Infinity : filterBy.maxPrice
        const criteria = {
            $and:
                [
                    { name: { $regex: filterBy.txt, $options: 'i' } },
                    { price: { $lte: +filterBy.maxPrice } },
                    filterBy.labels !== undefined ? { labels: { $in: filterBy.labels } } : {},
                    filterBy.inStock === 'true' ? { inStock: true } : {},
                ]
        }
        const sortBy = { [filterBy.sortBy ? filterBy.sortBy : 'name']: +filterBy.sortDir }
        const collection = await dbService.getCollection('toy');
        const toys = await collection.find(criteria)
            .sort(sortBy)
            .toArray()

        return toys
    } catch (err) {
        loggerService.error('Cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ _id: ObjectId.createFromHexString(toyId) })
        toy.createdAt = toy._id.getTimestamp()
        return toy
    } catch (err) {
        loggerService.error('Cannot find toy', err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const deletedCount = await collection.deleteOne({ _id: ObjectId.createFromHexString(toyId) })
        return deletedCount
    } catch (err) {
        loggerService.error(`cannot remove car ${carId}`, err)
        throw err
    }
}

async function save(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        if (toy._id) {
            const { name, price, labels, inStock } = toy
            const toyToSave = {
                name,
                price: +price,
                inStock,
                labels
            }
            await collection.updateOne({ _id: ObjectId.createFromHexString(toy._id) }, { $set: toyToSave })
        }
        else {
            await collection.insertOne(toy)
        }
        return toy
    } catch (err) {
        loggerService.error(`cannot update/save toy ${toy._id}`, err)
        throw err
    }
}











