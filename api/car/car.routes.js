const express = require('express')
const { getCars, getCar, removeCar, addCar, updateCar } = require('./car.controller')
const router = express.Router()


router.get('/', getCars)
router.get('/:id', getCar)
router.post('/', addCar)
router.put('/:id', updateCar)
router.delete('/:id', removeCar)

module.exports = router