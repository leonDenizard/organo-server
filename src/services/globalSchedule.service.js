const GlobalSchedule = require('../models/GlobalSchedule')

const create = (body) => GlobalSchedule.create(body)

const findByDate = (date) => {
  if (Array.isArray(date)) {
    return GlobalSchedule.find({ date: { $in: date } })
  }
  return GlobalSchedule.findOne({ date: date })
}

const getAll = () => {
    return GlobalSchedule.find()
}

module.exports = {
    create,
    findByDate,
    getAll
}