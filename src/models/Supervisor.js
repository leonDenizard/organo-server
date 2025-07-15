const mongoose = require('mongoose')

const SupervisorSchema = new mongoose.Schema({

    name: {
        type: String
    }
})

const Supervisor = mongoose.model("Supervisor", SupervisorSchema)
module.exports = Supervisor