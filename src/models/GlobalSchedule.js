const mongoose = require('mongoose')

const GlobalScheduleSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    dayOfWeek: {
        type: String
    },
    shifts: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            status: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Status",
                required: true
            },
            time: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "WorkShift"
            }
        }

    ]

}, {timestamps: true})

module.exports = mongoose.model("GlobalSchedule", GlobalScheduleSchema)