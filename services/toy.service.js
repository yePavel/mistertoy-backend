import fs from 'fs'
import { utilService } from "./util.service.js"

const toys = utilService.readJsonFile('data/toy.json')


export const toyService = {
    query,
    get,
    save,
    remove,
    // getEmptyToy,
    // getDefaultFilter,
    // getLabels
}

function query(filterBy = {}) {
    var filteredToys = toys
    if (!filteredToys) return Promise.reject('Cannot get toys data!')

    if (!filterBy.txt) filterBy.txt = ''
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    const regExp = new RegExp(filterBy.txt, 'i')
    filteredToys = filteredToys.filter(toy =>
        regExp.test(toy.name) &&
        toy.price <= filterBy.maxPrice
    )
    if (filterBy.inStock)
        filteredToys = filteredToys.filter(toy => toy.inStock === true)
    if (filterBy.labels && filterBy.labels.length) {
        filteredToys = filteredToys.filter(toy =>
            filterBy.labels.every(label => toy.labels.includes(label))
        )
    }
    if (filterBy.sortBy === 'name') {
        filteredToys.sort((t1, t2) => {
            return t1.name.localeCompare(t2.name) * filterBy.sortDir
        })
    }
    else if (filterBy.sortBy === 'price' ||
        filterBy.sortBy === 'createdAt') {
        filteredToys.sort((t1, t2) => {
            return (t1.price - t2.price) * filterBy.sortDir
        })
    }

    return Promise.resolve(filteredToys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject(`Couldn't find toy`)
    toys.splice(idx, 1)
    return _saveToysToFile()
}

function save(toy) {
    console.log('toy:', toy)
    if (toy._id) {
        const idx = toys.findIndex(currToy => currToy._id === toy._id)
        toys[idx] = { ...toys[idx], ...toy }
    } else {
        toy._id = _makeId()
        toy.createdAt = Date.now()
        toy.inStock = true
        toys.unshift(toy)
    }
    return _saveToysToFile()
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        const toysStr = JSON.stringify(toys, null, 4)
        fs.writeFile('data/toy.json', toysStr, err => {
            if (err) {
                return console.log(err)
            }
            resolve()
        })
    })
}

function _makeId(length = 5) {
    let text = ''
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}








