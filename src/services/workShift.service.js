const WorkShift = require('../models/WorkShift')

const create = (body) => WorkShift.create(body)

module.exports = {
    create
}