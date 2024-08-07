import { loggerService } from "../../services/logger.service.js";
// import { toyService } from "../../services/toy.service.js";
import { toyService } from "./toy.service.js";

export async function getToys(req, res) {
    try {
        // const filterBy = req.query
        const filterBy = {
            txt: req.query.txt || '',
            maxPrice: req.query.maxPrice || '',
            inStock: req.query.inStock || 'false',
            sortBy: req.query.sortBy || '',
            sortDir: req.query.sortDir || '1'
        }
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
        const toy = await toyService.getById(toyId)
        res.json(toy)
    } catch (err) {
        loggerService.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

export async function addToy(req, res) {
    const { loggedinUser } = req
    try {
        const { name, price, labels, inStock } = req.body
        const toy = {
            name,
            price: +price,
            inStock,
            labels
        }
        toy.owner = loggedinUser
        const addedToy = await toyService.save(toy)
        res.json(addedToy)
    } catch (err) {
        loggerService.error('Failed to save toy', err)
        res.status(500).send({ err: 'Failed to save toy' })
    }
}

export async function updateToy(req, res) {
    try {
        const toy = req.body
        const updatedToy = await toyService.save(toy)
        console.log('updatedToy:', updatedToy)
        res.json(updatedToy)
    } catch (err) {
        loggerService.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

export async function removeToy(req, res) {
    try {
        const { toyId } = req.params
        const deletedCount = await toyService.remove(toyId)
        res.send(`${deletedCount} toys removed`)
    } catch (err) {
        loggerService.error('Failed to remove toy', err)
        res.status(500).send({ err: 'Failed to remove toy' })
    }
}