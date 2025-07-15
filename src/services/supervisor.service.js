const Supervisor = require('../models/Supervisor')

const create = (body) => Supervisor.create(body)

const findAllSuper = () => Supervisor.find()

const findById = (id) => {
    return Supervisor.findById(id)
}

const findByName = (name) =>{
    return Supervisor.findOne({name})
}

const deleteAll = () => Supervisor.deleteMany()

const deleteById = (id) => {
    return Supervisor.findByIdAndDelete(id)
} 


module.exports = {
    create,
    findAllSuper,
    findById,
    findByName,
    deleteAll,
    deleteById
}