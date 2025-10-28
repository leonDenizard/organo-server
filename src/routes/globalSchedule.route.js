const route = require('express').Router()
const globalScheduleController = require('../controllers/globalSchedule.controller')

route.post('/', globalScheduleController.create)
route.get('/filter-by-date/:date', globalScheduleController.getByDate)
route.patch('/update-status/bulk', globalScheduleController.updateShiftBulk)
route.patch('/update-status/:shiftId', globalScheduleController.updateShift)
route.delete('/ids', globalScheduleController.deleteScheduleByID)

route.get('/', globalScheduleController.getAll)
route.get('/:id', globalScheduleController.getByUser)
route.delete('/', globalScheduleController.deleteSchedule)

module.exports = route