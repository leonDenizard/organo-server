const route = require('express').Router()
const supervisorController = require('../controllers/supervisor.controller')

route.post('/', supervisorController.create)
route.get('/', supervisorController.findAll)
route.get('/:id', supervisorController.findById)
route.delete('/', supervisorController.deleteAll)
route.delete('/:id', supervisorController.deleteById)

module.exports = route