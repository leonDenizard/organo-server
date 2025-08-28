const route = require('express').Router()
const statusController = require('../controllers/status.controller')

route.post('/', statusController.create)
route.get('/', statusController.findAll)
route.get('/:id', statusController.findById)
route.get('/:name', statusController.findByName)
route.delete('/', statusController.deleteAll)
route.delete('/:id', statusController.deleteById)

module.exports = route