const route = require('express').Router()

const scheduleController = require('../controllers/schedule.controller')

route.post('/', scheduleController.createSchedule)
route.get('/:id', scheduleController.findByID)
route.get('/', scheduleController.findAll)
route.post('/update', scheduleController.updateSchedule)
route.get('/date/:date', scheduleController.findByDate)

// Comentado por causa da migração para Vercel Serverless
// route.delete('/', scheduleController.deleteSchedule)

module.exports = route