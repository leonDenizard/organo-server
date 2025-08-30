const route = require('express').Router()
const globalScheduleController = require('../controllers/globalSchedule.controller')

route.post('/', globalScheduleController.create)
route.get('/', globalScheduleController.getAll)
route.get('/:id', globalScheduleController.getByUser)
route.get('/filter-by-date/:date', globalScheduleController.getByDate)

module.exports = route