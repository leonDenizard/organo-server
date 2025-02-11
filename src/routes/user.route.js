const route = require('express').Router()
const userController = require('../controllers/user.controller')

route.post('/', userController.createUser)
route.get('/', userController.findAllUsers)
route.get('/:uid', userController.findById)
route.delete('/', userController.deleteAll)
route.patch('/:uid', userController.findByUidAndUpdate)

module.exports = route