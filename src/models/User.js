const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    whatsapp: {
        type: String,
    },
    slack: {
        type: String,
    },
    email: {
        type: String,
    },
    time: {
        type: String,
    },
    role: {
        type: String,
    },
    squad: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Squad'
    }],
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supervisor'
    },
    photoUrl: {
        type: String
    },
    surname: {
        type: String
    },
    birthday: {
        type: String
    },
    child: {
        type: String
    },
    admin: {
        type: Boolean
    },
    interval: {
        type: String
    },


})

const User = mongoose.model("User", UserSchema)

module.exports = User