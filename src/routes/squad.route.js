const route = require('express').Router()
const squadController = require('../controllers/squad.controller')

route.post('/', squadController.create)
route.get('/', squadController.findAll)
route.get('/:id', squadController.findById)
route.delete('/', squadController.deleteAll)
route.delete('/:id', squadController.deleteById)

module.exports = route