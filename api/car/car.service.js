const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    const critiria = _buildCritiria(filterBy)
    const collection = await dbService.getCollection('car')

    try {
        const cars = await collection.find().toArray()




        return cars;
    } catch (err) {
        throw err;
    }
}

async function getById(carId) {
    const collection = await dbService.getCollection('car')
    try {
        const car = await collection.findOne({ '_id': ObjectId(carId) })

        return car
    } catch (err) {
        throw err
    }
}

async function remove(carId) {
    const collection = await dbService.getCollection('car')
    try {
        await collection.deleteOne({ '_id': ObjectId(carId) })
    } catch (err) {
        throw err
    }
}

async function add(car) {
    const collection = await dbService.getCollection('car')
    try {
        await collection.insertOne(car)
        return car
    } catch (err) {
        throw err
    }
}

async function update(car) {
    const collection = await dbService.getCollection('car')
    car._id = ObjectId(car._id)
    try {
        await collection.updateOne({ _id: car._id }, { $set: car })
        return car
    } catch (err) {
        throw err
    }
}

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}

function _buildCritiria(filterBy) {
    const critiria = {}
    if (filterBy.vendor) {
        critiria.vendor = filterBy.vendor
    }
    if (filterBy.price) {
        critiria.price = filterBy.price
    }

    return critiria
}