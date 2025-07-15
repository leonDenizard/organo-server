const Supervisor = require('../models/Supervisor')

const create = (body) => Supervisor.create(body)


module.exports = {
    create
}