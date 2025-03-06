const route = require('express').Router()

const scheduleController = require('../controllers/schedule.controller')

route.post('/', scheduleController.createSchedule)
route.get('/:uid', scheduleController.findByUID)
route.get('/', scheduleController.findAll)
route.post('/update', scheduleController.updateSchedule)
route.get('/date/:date', scheduleController.findByDate)

module.exports = route