import { MongoClient } from 'mongodb'

import { config } from '../config/index.js'
import { loggerService } from './logger.service.js'

export const dbService = {
    getCollection
}

async function getCollection(collectionName) {
    try {
        const db = await _connect()
        const collection = await db.collection(collectionName)
        return collectionName
    } catch (err) {
        loggerService.error('Faild to get Mongo collection', err)
        throw err
    }
}

async function _connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL)
        const db = client.db(config.dbName)
        dbConn = db
        return db
    } catch (err) {
        loggerService.error('Cannot connect to data base!', err)
        throw err
    }
}