const WorkShift = require('../models/WorkShift')

const create = (body) => WorkShift.create(body)

const findById = async (id) => {
    return await WorkShift.findById(id)
}

const findByStartAndEndTime = async ( startTime, endTime ) => {
    return await WorkShift.findOne({ startTime, endTime })
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