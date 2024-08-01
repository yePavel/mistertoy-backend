import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'
import { loggerService } from "../../services/logger.service.js"

export const userService = {
    // query,
    getById,
    // getByUsername,
    // remove,
    update,
    // add,
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ _id: ObjectId.createFromHexString(userId) })
        delete user.password
        return user
    } catch (err) {
        loggerService.error('Failed to get user', err)
        throw err
    }
}
async function update(user) {
    console.log('user:', user)
    try {
        const collection = await dbService.getCollection('user')
        const updatedUser = {
            _id: ObjectId.createFromHexString(user._id),
            username: user.username,
            fullname: user.fullname,
        }
        await collection.updateOne({ _id: updatedUser._id }, { $set: updatedUser })
        return updatedUser
    } catch (err) {
        loggerService.error('Failed to update user', err)
        throw err
    }
}