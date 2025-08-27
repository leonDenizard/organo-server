const route = require('express').Router()
const globalScheduleController = require('../controllers/globalSchedule.controller')

route.post('/', globalScheduleController.create)
route.get('/', globalScheduleController.getAll)

module.exports = route