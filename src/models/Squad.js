const mongoose = require('mongoose')

const SquadSchema = new mongoose.Schema({

    name: {
        type: String
    },
    description: {
        type: String
    }
    
}, {timestamps: true})

const Squad = mongoose.model("Squad", SquadSchema)
module.exports = Squad