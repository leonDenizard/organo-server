const route = require('express').Router()
const globalScheduleController = require('../controllers/globalSchedule.controller')

route.post('/', globalScheduleController.create)
route.get('/', globalScheduleController.getAll)
route.get('/:id', globalScheduleController.getByUser)
route.get('/filter-by-date/:date', globalScheduleController.getByDate)
route.post('/update-status/:id/:date', globalScheduleController.updateStatus)

module.exports = route