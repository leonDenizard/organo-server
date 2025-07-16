const route = require('express').Router()
const routeController = require('../controllers/position.controller')

route.post('/', routeController.create)
route.get('/', routeController.findAll)
route.get('/:id', routeController.findById)
route.delete('/', routeController.deleteAll)
route.delete('/:id', routeController.deleteById)

module.exports = route