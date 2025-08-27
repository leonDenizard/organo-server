const route = require('express').Router()
const globalScheduleController = require('../controllers/globalSchedule.controller')

route.post('/', globalScheduleController.create)

module.exports = route