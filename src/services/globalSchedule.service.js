const GlobalSchedule = require('../models/GlobalSchedule')

const create = (body) => GlobalSchedule.create(body)

const findByDate = (date) => GlobalSchedule.findOne({ date: date })

module.exports = {
    create,
    findByDate
}