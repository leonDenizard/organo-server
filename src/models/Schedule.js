const mongoose = require('mongoose')

const ScheduleSchema = mongoose.Schema({
    schedule: {
        type: Map,
        of: [String],
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('Schedule', ScheduleSchema)