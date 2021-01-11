const logger = require('../../services/logger.service')
const carService = require('./car.service')

async function getCars(req, res) {
    try {
        const cars = await carService.query(req.query)
        res.send(cars)
    } catch (err) {
        logger.error('Cannot get cars', err)
        res.status(500).send({ error: 'cannot get cars' })
    }
}

async function getCar(req, res) {
    try {
        const car = await carService.getById(req.params.id)
        res.send(car)
    } catch (err) {
        logger.error('Cannot get car', err)
        res.status(500).send({ error: 'Cannot get car' })
    }
}

async function removeCar(req, res) {
    try {
        const car = await carService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete car', err)
        res.status(500).send({ error: 'cannot delete car' })
    }
}

async function addCar(req, res) {
    try {
        var car = req.body
        car = await carService.add(car)
    } catch (err) {
        logger.error('Cannot add car', err)
    }
    res.send(car)
}

async function updateCar(req, res) {
    try {
        const car = req.body
        await carService.update(car)
    } catch (err) {
        logger.error('Cannot update car', err)
    }
    res.send(car)
}

module.exports = {
    getCars,
    getCar,
    removeCar,
    addCar,
    updateCar
}