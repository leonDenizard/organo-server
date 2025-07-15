const WorkShift = require('../models/WorkShift')

const create = (body) => WorkShift.create(body)

const findById = (id) => {
    return WorkShift.findById(id)
}

const findByStartAndEndTime = ( startTime, endTime ) => {
    return WorkShift.findOne({ startTime, endTime })
}

const findAllWorkShift = () => WorkShift.find()

const deleteAll = () => WorkShift.deleteMany()

const deleteById = (id) => {
    return WorkShift.findByIdAndDelete(id)
}

module.exports = {
    create,
    findById,
    findByStartAndEndTime,
    findAllWorkShift,
    deleteAll,
    deleteById
}