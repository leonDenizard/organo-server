const route = require('express').Router()

const workShiftController = require('../controllers/workShift.controller')

// route.get('/', workShiftController.findAllWorkShift)
// route.get('/:id', workShiftController.findById)
route.post('/', workShiftController.createWorkShift)
// route.delete('/', workShiftController.deleteAll)
// route.delete('/:id', workShiftController.deleteById)
// route.patch('/:uid', userController.findByUidAndUpdate)

module.exports = route