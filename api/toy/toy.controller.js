import { loggerService } from "../../services/logger.service.js";
import { toyService } from "../../services/toy.service.js";

export async function getToys(req, res) {
    try {
        const { filterBy = {} } = req.query
        const toys = await toyService.query(filterBy)
        res.json(toys)
    } catch (err) {
        loggerService.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

export async function getToyById(req, res) {
    try {
        const { toyId } = req.params
        const toy = await toyService.get(toyId)
        res.json(toy)
    } catch (err) {
        loggerService.error('Faild to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

export async function addToy(req, res) {
    try {
        const { name, price, labels, inStock } = req.body
        const toy = {
            name,
            price: +price,
            inStock,
            labels
        }
        const addedToy = await toyService.save(toy)
        res.json(addedToy)
    } catch (err) {
        loggerService.error('Faild to save toy', err)
        res.status(500).send({ err: 'Failed to save toy' })
    }
}

export async function updateToy(req, res) {
    try {
        const { _id, name, price, labels, inStock } = req.body
        const toy = {
            _id,
            name,
            price: +price,
            inStock,
            labels
        }
        const updatedToy = await toyService.save(toy)
        console.log('updatedToy:', updatedToy)
        res.json(updatedToy)
    } catch (err) {
        loggerService.error('Faild to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}