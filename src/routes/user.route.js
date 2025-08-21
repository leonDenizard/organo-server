const route = require('express').Router()
const userController = require('../controllers/user.controller')

route.post('/', userController.createUser)
route.get('/', userController.findAllUsers)
route.get('/:id', userController.findById)
route.get('/sigin/:uid', userController.findByUId)
route.delete('/', userController.deleteAll)
route.delete('/:id', userController.deleteById)
route.patch('/:id', userController.findByIDAndUpdate)

module.exports = route