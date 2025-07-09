const mongoose = require('mongoose')

const WorkShiftSchema = new mongoose.Schema({

    startTime:{
        type: String,
        required: true,
        match: /^\d{2}:\d{2}$/
    },
    endTime:{
        type: String,
        required: true,
        match: /^\d{2}:\d{2}$/
    }

})

const WorkShift = mongoose.model("WorkShift", WorkShiftSchema)
module.exports = WorkShift